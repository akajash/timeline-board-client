import React from 'react'


const CustomNavbar = () => {

    
    return(
        <nav className="custom_nav">
            <a href="/app/dashboard" className="custom__nav__link">
                <i className = "ni ni-chart-bar-32 text-blue"></i>
                {/* <span className="nav__text">Dashboard</span> */}
            </a>
            <a href="/app/projects" className="custom__nav__link">
                <i className = "ni ni-camera-compact text-green"></i>
                {/* <span className="nav__text">Shoots</span> */}
            </a>
            <a href="/app/workforce" className="custom__nav__link">
                <i className = "ni ni-circle-08 text-yellow"></i>
                {/* <span className="nav__text">Workforce</span> */}
            </a>
            <a href="/app/settings/data" className="custom__nav__link">
                <i className = "ni ni-money-coins text-orange"></i>
                {/* <span className="nav__text">Revenue</span> */}
            </a>
            <a href="/app/tasks" className="custom__nav__link">
                <i className = "ni ni-time-alarm text-red"></i>
                {/* <span className="nav__text">Tasks</span> */}
            </a>
        </nav>
    )
}

export default CustomNavbar