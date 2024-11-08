"use client";
const YearSelect = ({ value, low, top }) => {
  const years = [];
  for (let year = low; year <= top; year++) {
    years.push(year);
  }

  return (
    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
      <option value="">{value}</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
