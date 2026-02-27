import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (dataList) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Create a temporary container for rendering each page
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'fixed';
  tempContainer.style.left = '-9999px';
  tempContainer.style.width = '210mm';
  tempContainer.style.minHeight = '297mm';
  tempContainer.style.padding = '20mm';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.style.display = 'flex';
  tempContainer.style.flexDirection = 'column';
  tempContainer.style.justifyContent = 'center';
  tempContainer.style.alignItems = 'center';
  tempContainer.style.textAlign = 'center';
  tempContainer.style.boxSizing = 'border-box';
  tempContainer.style.fontFamily = "'Noto Sans TC', sans-serif";
  document.body.appendChild(tempContainer);

  try {
    for (let i = 0; i < dataList.length; i++) {
      const item = dataList[i];
      
      // Clear previous content
      tempContainer.innerHTML = '';

      // Create seat number element with brackets
      const seatNumberEl = document.createElement('div');
      seatNumberEl.style.fontSize = '60px';
      seatNumberEl.style.fontWeight = 'bold';
      seatNumberEl.style.color = '#D97706';
      seatNumberEl.style.marginBottom = '40px';
      seatNumberEl.style.textAlign = 'center';
      seatNumberEl.style.lineHeight = '1.2';
      seatNumberEl.textContent = `【 座號 ${item.seatNumber} 】`;

      // Create ingredients element
      const ingredientsEl = document.createElement('div');
      ingredientsEl.style.fontSize = '80px';
      ingredientsEl.style.fontWeight = 'bold';
      ingredientsEl.style.color = '#7C2D12';
      ingredientsEl.style.textAlign = 'center';
      ingredientsEl.style.wordWrap = 'break-word';
      ingredientsEl.style.maxWidth = '170mm';
      ingredientsEl.style.lineHeight = '1.4';
      ingredientsEl.textContent = item.ingredients || '';

      tempContainer.appendChild(seatNumberEl);
      tempContainer.appendChild(ingredientsEl);

      // Convert to canvas with higher scale for better quality
      const canvas = await html2canvas(tempContainer, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Add page to PDF
      if (i > 0) {
        doc.addPage();
      }
      
      doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
    }

    doc.save('ingredients_export.pdf');
  } finally {
    document.body.removeChild(tempContainer);
  }
};
