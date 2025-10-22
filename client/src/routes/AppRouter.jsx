import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLAyout from '../layout/MainLAyout'
import TextContainer from '../components/TextContainer'
import Output from '../components/Output'
 
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLAyout expected to render an <Outlet /> */}
        <Route path="/" element={<MainLAyout />}>
          {/* explicit summary route */}
          <Route path="summary" element={<Output />} />
          {/* Render TextContainer at root and when a tab is in the URL.
              TextContainer will read the param and show the proper option. */}
          <Route index element={<TextContainer />} />
          <Route path=":tab" element={<TextContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
