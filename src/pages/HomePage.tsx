import React, { useState } from 'react';
import Breadcrumb, { BreadcrumbItemProps } from '@/components/BreadCrum/index'; // Adjust the path as per your project structure
import { DatePicker } from '@/components/DateTimePicker/index'; // Adjust the path as per your project structure
import SearchWidget from '@/components/search/search'; 
const Homepage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle date change
  const handleDateChange = (date, event) => {
    // Update the selected date state
    setSelectedDate(date);
  };
  return (
    <div className='bg-white'>
   <Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
  <Breadcrumb.Item href="/products/category" disableCurrent={false}>Category</Breadcrumb.Item>
</Breadcrumb>
<DatePicker
  onChange={handleDateChange}
  selectsRange={false}
  inputProps={{ placeholder: 'Select date' }}
/>
<SearchWidget className="custom-search-widget" />


    </div>
  );
};

export default Homepage;
