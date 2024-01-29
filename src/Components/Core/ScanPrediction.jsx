import React from 'react'
import { ScanPredictionData } from '../../Util/ScanPredictionData'
import './ScanPrediction.css'
import ScanPredictionCard from './ScanPredictionCard'

const ScandPrediction = () => {
    return (
        <div className='scan-prediction-container mt-[3%]'>
            <div>
                <div className='text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]'>Scans & <span className='text-[#008E7B]'>Prediction</span></div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-12 place-items-center gap-y-8'>
                    {
                        ScanPredictionData.map((provideCard) => (
                            <ScanPredictionCard data={provideCard} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ScandPrediction