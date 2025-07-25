import AddBlogForm from '@/app/customer/components/dashboard/forms/BlogForm'
import BreadcrumbComponent from '@/app/customer/components/others/Breadcrumb'
import React from 'react'

const AddBlogPage = () => {
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent links={['/dashboard', '/blogs']} pageText='add blog' />
      <AddBlogForm />
    </div>
  )
}

export default AddBlogPage