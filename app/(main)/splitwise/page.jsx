'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, RefreshCw, Building, Users, TrendingUp, DollarSign, FileText, Calendar, Download, Eye } from 'lucide-react'

export default function EnterpriseFinanceSplitter() {
  const [mode, setMode] = useState('partnership') // 'partnership' or 'enterprise'
  const [expenseData, setExpenseData] = useState({
    totalAmount: '',
    expenseType: 'operational',
    description: '',
    date: new Date().toISOString().split('T')[0],
    department: '',
    projectId: '',
    vendor: '',
    taxRate: '18', // Default GST rate
    currency: 'INR'
  })
  
  const [participants, setParticipants] = useState([
    { id: 1, name: '', role: 'Partner', equity: '50', department: 'General', costCenter: '' }
  ])
  
  const [results, setResults] = useState(null)
  const [expenseHistory, setExpenseHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const expenseTypes = [
    'operational', 'marketing', 'travel', 'equipment', 'utilities', 
    'legal', 'insurance', 'consulting', 'software', 'office_supplies',
    'meals', 'entertainment', 'training', 'maintenance', 'other'
  ]

  const addParticipant = () => {
    const newParticipant = mode === 'partnership' 
      ? { id: Date.now(), name: '', role: 'Partner', equity: '0', department: 'General', costCenter: '' }
      : { id: Date.now(), name: '', role: 'Employee', equity: '0', department: 'General', costCenter: '' }
    
    setParticipants([...participants, newParticipant])
  }

  const removeParticipant = (id) => {
    if (participants.length > 1) {
      setParticipants(participants.filter(p => p.id !== id))
    }
  }

  const updateParticipant = (id, field, value) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const updateExpenseData = (field, value) => {
    setExpenseData(prev => ({ ...prev, [field]: value }))
  }

  const calculateSplit = () => {
    const amount = parseFloat(expenseData.totalAmount)
    const taxRate = parseFloat(expenseData.taxRate) || 0

    if (isNaN(amount) || amount <= 0) {
      setResults(null)
      return
    }

    const taxAmount = amount * (taxRate / 100)
    const totalWithTax = amount + taxAmount

    let splitResults = []

    if (mode === 'partnership') {
      // Partnership split based on equity percentage
      const totalEquity = participants.reduce((sum, p) => sum + (parseFloat(p.equity) || 0), 0)
      
      if (totalEquity === 0) {
        // Equal split if no equity specified
        const perPersonAmount = totalWithTax / participants.length
        splitResults = participants.map(participant => ({
          name: participant.name || `Partner ${participant.id}`,
          role: participant.role,
          amount: perPersonAmount.toFixed(2),
          percentage: (100 / participants.length).toFixed(1),
          department: participant.department
        }))
      } else {
        splitResults = participants.map(participant => {
          const equity = parseFloat(participant.equity) || 0
          const percentage = (equity / totalEquity) * 100
          const amount = (totalWithTax * equity) / totalEquity
          
          return {
            name: participant.name || `Partner ${participant.id}`,
            role: participant.role,
            amount: amount.toFixed(2),
            percentage: percentage.toFixed(1),
            department: participant.department
          }
        })
      }
    } else {
      // Enterprise split - can be equal or based on department allocation
      const totalAllocation = participants.reduce((sum, p) => sum + (parseFloat(p.equity) || 1), 0)
      
      splitResults = participants.map(participant => {
        const allocation = parseFloat(participant.equity) || 1
        const percentage = (allocation / totalAllocation) * 100
        const amount = (totalWithTax * allocation) / totalAllocation
        
        return {
          name: participant.name || `Employee ${participant.id}`,
          role: participant.role,
          amount: amount.toFixed(2),
          percentage: percentage.toFixed(1),
          department: participant.department,
          costCenter: participant.costCenter
        }
      })
    }

    const newResult = {
      id: Date.now(),
      date: expenseData.date,
      description: expenseData.description,
      expenseType: expenseData.expenseType,
      subtotal: amount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalWithTax: totalWithTax.toFixed(2),
      currency: expenseData.currency,
      department: expenseData.department,
      projectId: expenseData.projectId,
      vendor: expenseData.vendor,
      splits: splitResults,
      mode: mode
    }

    setResults(newResult)
    setExpenseHistory(prev => [newResult, ...prev])
  }

  const handleReset = () => {
    setExpenseData({
      totalAmount: '',
      expenseType: 'operational',
      description: '',
      date: new Date().toISOString().split('T')[0],
      department: '',
      projectId: '',
      vendor: '',
      taxRate: '18',
      currency: 'INR'
    })
    setParticipants([
      { id: 1, name: '', role: mode === 'partnership' ? 'Partner' : 'Employee', equity: mode === 'partnership' ? '50' : '1', department: 'General', costCenter: '' }
    ])
    setResults(null)
  }

  const exportToCSV = () => {
    if (!results) return
    
    const csvContent = [
      ['Expense Report'],
      ['Date', results.date],
      ['Description', results.description],
      ['Type', results.expenseType],
      ['Subtotal', results.subtotal],
      ['Tax Amount', results.taxAmount],
      ['Total', results.totalWithTax],
      [''],
      ['Name', 'Role', 'Department', 'Amount', 'Percentage'],
      ...results.splits.map(split => [
        split.name, split.role, split.department, split.amount, split.percentage + '%'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expense-split-${results.date}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 p-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-200 dark:bg-slate-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative w-full max-w-7xl mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-white dark:to-blue-300 bg-clip-text text-transparent mb-4">
            Enterprise Finance Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Professional expense splitting for partnerships and enterprises
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Button
                onClick={() => setMode('partnership')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  mode === 'partnership' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-5 h-5" />
                Partnership Mode
              </Button>
              <Button
                onClick={() => setMode('enterprise')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  mode === 'enterprise' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Building className="w-5 h-5" />
                Enterprise Mode
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Expense Input Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                Expense Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'partnership' ? 'Partnership expense allocation' : 'Enterprise cost distribution'}
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Basic Expense Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Amount (₹)
                  </label>
                  <Input
                    type="number"
                    value={expenseData.totalAmount}
                    onChange={(e) => updateExpenseData('totalAmount', e.target.value)}
                    placeholder="Enter total amount"
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={expenseData.taxRate}
                    onChange={(e) => updateExpenseData('taxRate', e.target.value)}
                    placeholder="GST/Tax rate"
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expense Type
                  </label>
                  <select
                    value={expenseData.expenseType}
                    onChange={(e) => updateExpenseData('expenseType', e.target.value)}
                    className="w-full p-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {expenseTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={expenseData.date}
                    onChange={(e) => updateExpenseData('date', e.target.value)}
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <Input
                  type="text"
                  value={expenseData.description}
                  onChange={(e) => updateExpenseData('description', e.target.value)}
                  placeholder="Expense description"
                  className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {mode === 'enterprise' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <Input
                      type="text"
                      value={expenseData.department}
                      onChange={(e) => updateExpenseData('department', e.target.value)}
                      placeholder="Department name"
                      className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Project ID
                    </label>
                    <Input
                      type="text"
                      value={expenseData.projectId}
                      onChange={(e) => updateExpenseData('projectId', e.target.value)}
                      placeholder="Project identifier"
                      className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vendor/Supplier
                </label>
                <Input
                  type="text"
                  value={expenseData.vendor}
                  onChange={(e) => updateExpenseData('vendor', e.target.value)}
                  placeholder="Vendor name"
                  className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Participants */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {mode === 'partnership' ? 'Partners' : 'Stakeholders'}
                  </label>
                  <Button
                    onClick={addParticipant}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Add {mode === 'partnership' ? 'Partner' : 'Person'}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                        <Input
                          type="text"
                          value={participant.name}
                          onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                          placeholder="Name"
                          className="bg-white dark:bg-gray-600"
                        />
                        <Input
                          type="text"
                          value={participant.role}
                          onChange={(e) => updateParticipant(participant.id, 'role', e.target.value)}
                          placeholder="Role/Position"
                          className="bg-white dark:bg-gray-600"
                        />
                        <Input
                          type="text"
                          value={participant.department}
                          onChange={(e) => updateParticipant(participant.id, 'department', e.target.value)}
                          placeholder="Department"
                          className="bg-white dark:bg-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-600 dark:text-gray-400">
                            {mode === 'partnership' ? 'Equity %' : 'Allocation Weight'}
                          </label>
                          <Input
                            type="number"
                            value={participant.equity}
                            onChange={(e) => updateParticipant(participant.id, 'equity', e.target.value)}
                            placeholder={mode === 'partnership' ? 'Equity %' : 'Weight'}
                            className="bg-white dark:bg-gray-600"
                          />
                        </div>
                        {mode === 'enterprise' && (
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600 dark:text-gray-400">
                              Cost Center
                            </label>
                            <Input
                              type="text"
                              value={participant.costCenter}
                              onChange={(e) => updateParticipant(participant.id, 'costCenter', e.target.value)}
                              placeholder="Cost center"
                              className="bg-white dark:bg-gray-600"
                            />
                          </div>
                        )}
                      </div>
                      {participants.length > 1 && (
                        <div className="flex justify-end mt-3">
                          <Button
                            onClick={() => removeParticipant(participant.id)}
                            variant="destructive"
                            size="sm"
                            className="px-3"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={calculateSplit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Calculate Split
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2 px-6"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-green-600" />
                Split Results
              </h2>
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={() => setShowHistory(!showHistory)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {showHistory ? 'Hide' : 'Show'} History
                </Button>
                {results && (
                  <Button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                )}
              </div>
            </div>

            {results && !showHistory && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-400">Subtotal</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-300">₹{results.subtotal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-400">Tax Amount</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-300">₹{results.taxAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-400">Total</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-300">₹{results.totalWithTax}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-green-700 dark:text-green-400">
                      <span className="font-medium">{results.description}</span> • {results.expenseType}
                    </p>
                  </div>
                </div>

                {/* Individual Splits */}
                <div className="grid gap-4">
                  {results.splits.map((split, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                              {split.name}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                              {split.role}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p>Department: {split.department}</p>
                            {split.costCenter && <p>Cost Center: {split.costCenter}</p>}
                            <p>Share: {split.percentage}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{split.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History View */}
            {showHistory && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Expense History</h3>
                {expenseHistory.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expense history yet</p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {expenseHistory.map((expense) => (
                      <div key={expense.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{expense.description}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {expense.date} • {expense.expenseType} • {expense.mode}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{expense.totalWithTax}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{expense.splits.length} participants</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}