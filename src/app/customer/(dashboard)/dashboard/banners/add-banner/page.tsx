import BannerForm from '@/app/customer/components/dashboard/forms/BannerForm'
import BreadcrumbComponent from '@/app/customer/components/others/Breadcrumb'
import React from 'react'

const AddBannerPage = () => {
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent links={['/dashboard', '/banners']} pageText='add banner' />
      <BannerForm />
    </div>
  )
}

export default AddBannerPage