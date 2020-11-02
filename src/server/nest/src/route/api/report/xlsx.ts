import { default as exceljs } from 'exceljs';
import { renderDatetime } from '../../../../../../../../main/src/utils';

export const genExceljs = async table => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet();
  worksheet.properties.defaultRowHeight = 15;
  worksheet.properties.defaultColWidth = 15;
  // worksheet.getColumn(1).width = 20;

  worksheet.addRows(table);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

export const totable = rows => {
  const keys = rows[0] ? Object.keys(rows[0]) : [];
  return [
    keys,
    ...rows
      .map(r => keys.map(k => r[k]))
      .map(row =>
        row.map(cell => (cell instanceof Date ? renderDatetime(cell) : cell)),
      ),
  ];
};

const main = async () => {
  const xlsx = await genExceljs([[1, 2, 3]]);
  console.log(xlsx);
};
