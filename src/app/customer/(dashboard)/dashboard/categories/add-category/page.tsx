import CategoryForm from '@/app/customer/components/dashboard/forms/CategoryForm'
import BreadcrumbComponent from '@/app/customer/components/others/Breadcrumb'
import React from 'react'

const AddCategoryPage = () => {
  return (
    <div className='p-2 w-full
    '>
      <BreadcrumbComponent links={['/dashboard', '/categories']} pageText='add category' />
      <CategoryForm />
    </div>
  )
}

export default AddCategoryPage