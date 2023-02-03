import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import type { IItem } from '../common/types'

const Home: NextPage = () => {

  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([] as IItem[])
  const [cart, setCart] = useState([] as object[])

  const filterRef = useRef<HTMLInputElement>(null)

  const basketContext = createContext(cart)
  const basket = useContext(basketContext)

  const total = basket.reduce((prev: any, curr: any) => prev + curr.price, 0)

  useEffect(() => {
    setLoading(true)
    fetch('/api/items?query=' + filter)
    .then((res) => res.json())
    .then((data) => {
      setData(data.items)
      setLoading(false)
    })
  }, [filter])

  const handleFilter = useCallback(() => {
    setFilter(filterRef.current === null ? '' : filterRef.current.value)
  }, [filterRef])

  const handleEnterfilter = useCallback((e: any) => {
    if(e.key === "Enter") {
      handleFilter();
    }
  }, [])
  
  const handleAddToCart = useCallback((item: any) => {
    let isExistAlready = cart.some((each: any) => each.id == item.id)
    setCart(isExistAlready ? [...cart] : [...cart, item])
  }, [cart])

  const handleRemoveFromCart = useCallback((item: any) => {
    setCart(cart.filter((each: any) => each.id !== item.id))
  }, [cart])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <Head>
        <title>Flowla shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className='col-span-full bg-slate-700 text-white px-10 py-4'>Flowla shop</div>
        <div className='lg:col-span-2 xl:col-span-3'>
          <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 px-10 pt-10 pb-32 md:h-manual-fit-screen overflow-auto'>
            <div className='col-span-full grid lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              <input type='text' 
                className='p-4 border border-gray-500 rounded-md lg:col-span-2 xl:col-span-3 indent-4 shadow-lg h-14' 
                ref={filterRef} 
                onKeyDown={handleEnterfilter}
                placeholder='Search here...' 
                defaultValue={filter} />
              <p 
                className='p-4 rounded-md bg-slate-800 text-white shadow-lg cursor-pointer text-center hover:shadow-2xl h-14' 
                onClick={handleFilter}
              >Search</p>
            </div>

            {isLoading ? (
              <div className='flex justify-center items-center col-span-full h-manual-loading-fit-screen overflow-auto'>
                <img src='/Spinner-5.gif' alt='loading' />
              </div>
            ) : 
            
            !data.length ? (
              <div className='flex justify-center items-center col-span-full h-manual-loading-fit-screen overflow-auto'>
                <img src='/no.png' alt='no results' />
              </div>
            ) : 
            
            (
              data.map((item: IItem) => {
                return (
                  <div className='flex flex-col justify-between border shadow-lg hover:shadow-xl' key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className='flex flex-col justify-between gap-4 p-4'>
                      <p className='font-bold text-lg'>{item.title}</p>
                      <p>{item.description}</p>
                    </div>
                    <div className='flex justify-between p-4'>
                      <p 
                        className='w-32 h-10 flex justify-center items-center bg-slate-300 cursor-pointer shadow-sm hover:bg-slate-100 hover:shadow-lg' 
                        onClick={() => handleAddToCart(item)}
                      >Add to cart</p>
                      <p className='w-32 h-10 flex justify-center items-center text-xl'>f {item.price}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        <basketContext.Provider value={cart}>
          <div className='p-10 flex flex-col justify-between md:h-manual-fit-screen overflow-auto bg-gray-100'>
            <div className='w-full pb-10'>
              <p className='text-3xl'>Cart</p>
              {
                basket.map((item: any) => {
                  return (
                    <div className='grid grid-cols-12 shadow-md mt-3 hover:shadow-lg' key={item.id}>
                      <div className='col-span-10 text-lg px-5 py-3 bg-white'>{item.title}</div>
                      <div 
                        className='col-span-2 flex justify-center items-center text-lg px-5 py-3 bg-white hover:bg-slate-800 hover:text-white cursor-pointer' 
                        onClick={() => handleRemoveFromCart(item)}
                      >X</div>
                    </div>
                  )
                })
              }
            </div>
            <div className='w-full'>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>f {total}</p>
              </div>
              <p className=' p-4 flex justify-center items-center bg-slate-900 text-white cursor-pointer hover:shadow-lg'>Order</p>
            </div>
          </div>
        </basketContext.Provider>
      </main >
    </div >
  )
}

export default Home