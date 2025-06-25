import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt;

  // Verify the payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log(`Webhook verified. Event type: ${evt.type}`);
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    console.log(`Attempting to create user ${id} (${email_addresses[0].email_address}) in DB.`);

    try {
      // Create user in database
      await db.user.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || null,
          imageUrl: image_url,
        },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Error creating user' },
        { status: 500 }
      );
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    console.log(`Attempting to update user ${id} (${email_addresses[0].email_address}) in DB.`);

    try {
      // Update user in database
      await db.user.update({
        where: { clerkUserId: id },
        data: {
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || null,
          imageUrl: image_url,
        },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json(
        { error: 'Error updating user' },
        { status: 500 }
      );
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    console.log(`Attempting to delete user ${id} from DB.`);

    try {
      // Delete user from database
      await db.user.delete({
        where: { clerkUserId: id },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: 'Error deleting user' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
} 