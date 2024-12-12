import React from 'react'
import RTRW from './RTRW'
import RDTR from './RDTR'
import Table from '../../Elements/Table'

const Hasil = ({data}) => {
  return (
    <>    
      <div>
          <h1>RTRW</h1>
          <Table data={data.RTRW} />
        </div>
    </>
  )
}

export default Hasil