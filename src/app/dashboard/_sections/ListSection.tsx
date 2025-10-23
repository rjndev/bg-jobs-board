import ListComponent from "../_components/ListComponent"

export default function ListSection() {
  return (
    <table className="w-full">
      <Header />
      <tbody>
        <ListComponent/>
        <ListComponent/>
      </tbody>
    </table>
  )
}

function Header() {
  return (
    <thead className="font-bold py-2 border-gray-400 border-t border-b">
      <tr>
        <th className="py-2">Job</th>
        <th>Location</th>
        <th>Date</th>
        <th>Rate</th>
        <th>Shift</th>
      </tr>
    </thead>
  )
}