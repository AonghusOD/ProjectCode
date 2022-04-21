import React from 'react'
import { FaWind } from 'react-icons/fa';
import { IoMdWater } from 'react-icons/io';
import { IoEarthOutline } from "react-icons/io5";
export const SidebarData = [
     {
        title: 'Air',
        path: '/air/',
        icon: <FaWind />,
        cName:  'side-text'
    },
    {
        title: 'Air Quality',
        path: '/air-quality/',
        icon: '-',
        cName:  'sub-text'
    },
    {
        title: 'CO2',
        path: '/co2/',
        icon: '-',
        cName:  'sub-text'
    },
    {
        title: 'Climate',
        path: '/climate/',
        icon: <IoEarthOutline />,
        cName:  'side-text'
    },
    {
        title: 'Humidity',
        path: '/humidity/',
        icon: '-',
        cName:  'sub-text'
    },
    {
        title: 'Temperture',
        path: '/temp/',
        icon: '-',
        cName:  'sub-text'
    },
    {
        title: 'Water',
        path: '/water/',
        icon: <IoMdWater />,
        cName:  'side-text'
    },
    {
        title: 'EC',
        path: '/ec/',  
        icon: '-',
        cName:  'sub-text'
    },
    {
        title: 'PH',
        path: '/ph/',
        icon: '-',
        cName:  'sub-text'
    },
]