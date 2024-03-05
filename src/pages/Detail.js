import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Detail = () => {
  const { handleSubmit, control, register, setValue, watch, formState: { errors }  } = useForm();

  const onSubmit = (data) => {
    data.religion = parseInt(data.religion, 10);
    data.gender = parseInt(data.gender, 10);
  
    console.log(data);
  };

  const handleDateChange = (date) => {
    setValue('date_of_birth', date.toISOString().split('T')[0]);
  };

  const umur =
    new Date().getFullYear() -
    (watch('date_of_birth') ? parseInt(watch('date_of_birth').substring(0, 4)) : 0);

  return (
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
            {...register('phone_number')}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            {...register('email')}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Place of Birth</label>
          <input
            {...register('place_of_birth')}
            type="email"
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
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;