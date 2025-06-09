import { motion } from 'framer-motion'

const SidebarItem = ({ icon: Icon, name, active, badge, collapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-left 
        ${active 
          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white 
            text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-3"
        >
          {name}
        </motion.span>
      )}
    </button>
  )
}

export default SidebarItem