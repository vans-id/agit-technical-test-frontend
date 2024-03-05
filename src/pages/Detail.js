import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Detail = () => {
  const { handleSubmit, control, register, setValue, watch, formState: { errors }  } = useForm();
  const { token } = useAuth();
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();

          console.log(result.data)

          setValue('name', result.data.name);
          setValue('nip', result.data.nip);
          setValue('phone', result.data.phone);
          setValue('email', result.data.email);
          setValue('place_of_birth', result.data.place_of_birth);
          setValue('date_of_birth', result.data.date_of_birth);
          setValue('address', result.data.address);
          setValue('religion', result.data.religion);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token])

  const onSubmit = async (data) => {
    data.religion = parseInt(data.religion, 10);
    data.gender = parseInt(data.gender, 10);

    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Update failed');
      }

      const res = await response.json();
      if (!res.data) {
        throw new Error('Update failed');
      }
      alert('Successfully update employee.');
      navigate("/employees");
    } catch (error) {
      console.error('Update error:', error.message);
      alert('Fail to update employee...');
    }
  };

  const handleDateChange = (date) => {
    setValue('date_of_birth', date.toISOString().split('T')[0]);
  };

  const umur =
    new Date().getFullYear() -
    (watch('date_of_birth') ? parseInt(watch('date_of_birth').substring(0, 4)) : 0);

  return (
    <>
      <Link to={`/employees`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
        Back
      </Link>

      <div className="max-w-md mx-auto mt-8 px-8 py-4 bg-white shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              {...register('name', { required: 'Name cannot be empty' })}
              type="text"
              className={`border rounded w-full py-2 px-3 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">NIP</label>
            <input
              {...register('nip')}
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>     
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              {...register('phone')}
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>        
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Place of Birth</label>
            <input
              {...register('place_of_birth')}
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  onChange={handleDateChange}
                  selected={field.value ? new Date(field.value) : null}
                  dateFormat="yyyy-MM-dd"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Age</label>
            <input
              value={umur}
              readOnly
              className="border rounded w-full py-2 px-3 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <input
              {...register('address')}
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Religion
            </label>
            <select
              {...register('religion', { required: true })}
              className="border rounded w-full py-2 px-3"
            >
              <option value={1}>Muslim</option>
              <option value={2}>Christian</option>
              <option value={3}>Hindu</option>
              <option value={4}>Buddha</option>
              <option value={5}>Konghucu</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Gender
            </label>
            <select
              {...register('gender', { required: true })}
              className="border rounded w-full py-2 px-3"
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Detail;
