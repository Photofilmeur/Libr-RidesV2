import React from 'react'
import styled, { keyframes } from 'styled-components'

const box1animation = keyframes`
  0%, 37.5%, 50%, 62.5%, 75%, 100% {
    width: 1px;
  }
  12.5%, 25% {
    width: 60px;
  }
`

const box2animation = keyframes`
  0%, 12.5%, 25%, 62.5%, 75%, 100% {
    width: 1px;
  }
  37.5%, 50% {
    width: 60px;
  }
`

const box3animation = keyframes`
  0%, 12.5%, 25%, 37.5%, 50%, 75%, 100% {
    width: 1px;
  }
  62.5%, 75% {
    width: 60px;
  }
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const Box = styled.div`
  width: 1px;
  height: 115px;
  border: 1px solid #e9e9e9;
  background-color: transparent;
  box-sizing: border-box;
`

const Box1 = styled(Box)`
  animation: ${box1animation} 4s forwards ease-in-out infinite;
`

const Box2 = styled(Box)`
  animation: ${box2animation} 4s forwards ease-in-out infinite;
`

const Box3 = styled(Box)`
  animation: ${box3animation} 4s forwards ease-in-out infinite;
`

function ProductRangeLoader() {
  return (
    <div className="relative min-h-screen min-w-full z-0 bg-black flex flex-col justify-center items-center">
      <Loader className="w-full flex items-center justify-center ">
        <Box1 />
        <Box2 />
        <Box3 />
      </Loader>
      <p className="text-white mt-4">Chargement en cours...</p>
    </div>
  )
}

export default ProductRangeLoader
