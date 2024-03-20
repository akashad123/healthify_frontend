import React, { createContext, useState } from 'react'

export const rescheduleAppointmentResponseContext = createContext()

export const adminApptActionResponseContext = createContext()

export const isAuthTokenContext = createContext()

function ContextShare({ children }) {

  const [rescheduleAppointmentResponse, setRescheduleAppointmentResponse] = useState({})

  const [adminApptActionResponse, setAdminApptActionResponse] = useState({})

  const [isAuthToken, setIsAuthToken] = useState(true)

  return (
    <>
      <rescheduleAppointmentResponseContext.Provider value={{ rescheduleAppointmentResponse, setRescheduleAppointmentResponse }}>
        <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
          <adminApptActionResponseContext.Provider>
            {children}
          </adminApptActionResponseContext.Provider>
        </isAuthTokenContext.Provider>
      </rescheduleAppointmentResponseContext.Provider>
    </>
  )
}

export default ContextShare