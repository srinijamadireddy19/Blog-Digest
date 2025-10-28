import logging
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER
from io import BytesIO
import base64

logger = logging.getLogger(__name__)

class PDFHandler:
    """Handle PDF generation"""
    
    def process(self, data):
        """
        Generate PDF from text content
        
        Args:
            data (dict): Preprocessed data
            
        Returns:
            dict: PDF generation result
        """
        logger.info("Generating PDF")
        
        text = data.get('preprocessed_text') or data.get('extracted_text')
        title = data.get('metadata', {}).get('title', 'Document')
        
        if not text:
            raise ValueError("No text available for PDF generation")
        
        # Create PDF in memory
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        
        # Container for the 'Flowable' objects
        elements = []
        
        # Define styles
        styles = getSampleStyleSheet()
        
        # Custom title style
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor='#065F46',
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        # Custom body style
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=12,
            leading=16,
            alignment=TA_JUSTIFY,
            spaceAfter=12
        )
        
        # Add title
        title_para = Paragraph(title, title_style)
        elements.append(title_para)
        elements.append(Spacer(1, 0.2 * inch))
        
        # Add content
        paragraphs = text.split('\n\n')
        for para_text in paragraphs:
            if para_text.strip():
                para = Paragraph(para_text, body_style)
                elements.append(para)
                elements.append(Spacer(1, 0.1 * inch))
        
        # Build PDF
        doc.build(elements)
        
        # Get PDF data
        pdf_data = buffer.getvalue()
        buffer.close()
        
        # Convert to base64 for easy transmission
        pdf_base64 = base64.b64encode(pdf_data).decode('utf-8')
        
        return {
            'filename': f'{title.replace(" ", "_")}.pdf',
            'size': f'{len(pdf_data) / 1024:.2f} KB',
            'pages': len(paragraphs) // 10 + 1,  # Rough estimate
            'pdf_base64': pdf_base64,
            'message': 'PDF generated successfully'
        }
