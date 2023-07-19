function sortTableByCountry() {
  const table = document.getElementById('jsonTable');
  const rows = table.rows;
  const dataRows = Array.from(rows).slice(1); // Überspringe die Kopfzeile

  dataRows.sort((rowA, rowB) => {
    const countryA = rowA.cells[0].textContent.trim().toLowerCase();
    const countryB = rowB.cells[0].textContent.trim().toLowerCase();
    return countryA.localeCompare(countryB);
  });

  // Lösche alle Zeilen aus der Tabelle
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Füge die sortierten Daten zurück in die Tabelle ein
  dataRows.forEach(row => table.appendChild(row));
}

document.addEventListener('DOMContentLoaded', function() {
  const jsonFile = 'co2daten.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      const table = document.getElementById('jsonTable');

      const headerRow = table.insertRow();
      const headers = ["Land", "Firma", "CO2 Ausstoß in Tonnen"];
      headers.forEach(headerText => {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = headerText;
        headerCell.style.fontSize = '20px';
        headerCell.style.fontWeight = 'bold';
        headerCell.style.backgroundColor = '#f8a20f';
      });
      
      data.forEach(item => {
        const row = table.insertRow();
        row.insertCell().textContent = item.country;
        row.insertCell().textContent = item.company;
        row.insertCell().textContent = item.co2;
      });

      // Rufe die Funktion zum Sortieren der Tabelle auf
      sortTableByCountry();
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
