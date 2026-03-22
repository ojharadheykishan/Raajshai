'use client'

import { useState } from 'react'
import { Download, Printer } from 'lucide-react'

interface InvoiceItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface InvoiceProps {
  orderNumber: string
  date: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  items: InvoiceItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: string
}

export default function Invoice({
  orderNumber,
  date,
  customerName,
  email,
  phone,
  address,
  city,
  state,
  pincode,
  items,
  subtotal,
  shipping,
  tax,
  total,
  paymentMethod,
}: InvoiceProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const element = document.getElementById('invoice-content')
    if (element) {
      const html = element.innerHTML
      const printWindow = window.open('', '', 'height=800,width=1000')
      if (printWindow) {
        printWindow.document.write(html)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Invoice Content */}
      <div id="invoice-content" className="print:text-black">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b-2 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-red-600">राजशाही शर्बत</h1>
            <p className="text-gray-600 mt-1">Premium Traditional Beverages</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">
              <span className="font-semibold">Invoice #</span> {orderNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {date}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Bill To */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Bill To</h3>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">{customerName}</p>
              <p>{address}</p>
              <p>
                {city}, {state} {pincode}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Email:</span> {email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {phone}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Order Details</h3>
            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Order Date:</span> {date}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{' '}
                {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </p>
              <p className="text-red-600 font-semibold mt-3">Status: Confirmed</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead className="bg-red-50 border-y-2 border-red-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Product
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-800">
                Qty
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">
                Unit Price
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{item.name}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">₹{item.price}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="text-gray-700">Shipping:</span>
              <span className="font-semibold text-gray-800">₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-gray-300">
              <span className="text-gray-700">Tax (5%):</span>
              <span className="font-semibold text-gray-800">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 bg-red-50 px-3 rounded">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-red-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Order Notes:</span> Thank you for shopping with राजशाही शर्बत! We appreciate your business. If you have any questions regarding your order, please contact us.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t-2 pt-6 text-center text-gray-600 text-sm">
          <p className="font-semibold text-gray-800 mb-2">राजशाही शर्बत</p>
          <p>📧 info@rajshahi-sharbat.com | 📞 +91-XXXX-XXXX-XX</p>
          <p className="mt-2">Thank you for your order!</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
