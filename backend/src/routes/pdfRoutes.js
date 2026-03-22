const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Generate PDF bill for order
router.post('/generate', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { order, items, customer } = req.body;
    
    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bill-${order.id}.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);
    
    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('SHREEGURUJI', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text('Premium Sharbat & Beverages', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(10).text('123 Beverage Street, Mumbai, India', { align: 'center' });
    doc.text('Phone: +91 98765 43210', { align: 'center' });
    doc.moveDown(2);
    
    // Bill title
    doc.fontSize(18).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
    doc.moveDown(1);
    
    // Order details
    doc.fontSize(10).font('Helvetica');
    doc.text(`Order ID: #${order.id}`);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`);
    doc.text(`Order Type: ${order.online_order ? 'Online' : 'Offline'}`);
    doc.moveDown(1);
    
    // Customer details
    doc.fontSize(12).font('Helvetica-Bold').text('Customer Details:');
    doc.fontSize(10).font('Helvetica');
    doc.text(`Name: ${customer.name || order.customer_name || 'N/A'}`);
    doc.text(`Phone: ${customer.phone || order.customer_phone || 'N/A'}`);
    doc.text(`Address: ${customer.address || order.customer_address || 'N/A'}`);
    doc.moveDown(1);
    
    // Items table
    doc.fontSize(12).font('Helvetica-Bold').text('Order Items:');
    doc.moveDown(0.5);
    
    // Table header
    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Item', 50, tableTop);
    doc.text('Qty', 300, tableTop);
    doc.text('Price', 350, tableTop);
    doc.text('Total', 420, tableTop);
    doc.moveDown(0.5);
    
    // Table rows
    doc.font('Helvetica');
    let y = doc.y;
    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      doc.text(`${index + 1}. ${item.product_name || `Product ${item.product_id}`}`, 50, y);
      doc.text(item.quantity.toString(), 300, y);
      doc.text(`₹${item.price}`, 350, y);
      doc.text(`₹${itemTotal}`, 420, y);
      y += 20;
    });
    
    doc.y = y;
    doc.moveDown(1);
    
    // Total
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text(`Total Amount: ₹${order.total_price}`, { align: 'right' });
    doc.moveDown(2);
    
    // Footer
    doc.fontSize(10).font('Helvetica');
    doc.text('Thank you for your order!', { align: 'center' });
    doc.moveDown(0.5);
    doc.text('For any queries, contact us at info@shreeguruji.com', { align: 'center' });
    
    // Finalize PDF
    doc.end();
    
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
