import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { token, logout } = useAuth();
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  const onDelete = (id) => {
    const deleteData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to delete data');
        } 
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
    deleteData();
    const updatedData = data.filter((employee) => employee.id !== id);
    setData(updatedData);
  }
  

  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <button onClick={logout} className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4">
        Logout
      </button>
      <Link to={`/employee`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4">
        Add
      </Link>
      <div className="flex flex-col justify-center pt-10">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Employees</h2>
          </header>
          
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">NIP</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">{item.nip}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="inline-flex">
                          <Link to={`/employees/${item.id}`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Detail
                          </Link>
                          <button onClick={() => onDelete(item.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))} 
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Employees