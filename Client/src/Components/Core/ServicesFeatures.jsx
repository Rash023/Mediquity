import React from 'react'
import { ServiceFeatureData } from '../../Util/ServicesFeatureData'
import ServiceCard from './ServiceCard'
import './ServicesFeatures.css'

const ServicesFeatures = () => {
    return (
        <div className='service-feature-container mt-[3%]'>
            <div>
                <div className='text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]'>Services & <span className='text-[#008E7B]'>Features</span></div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-12 place-items-center gap-y-8'>
                    {
                        ServiceFeatureData.map((provideCard) => (
                            <ServiceCard data={provideCard} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ServicesFeatures