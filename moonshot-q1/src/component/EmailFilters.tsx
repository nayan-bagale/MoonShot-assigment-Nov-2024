import { Fragment } from 'react'
import { EmailFilterT } from '../@types/email'
import { useEmail } from '../context/EmailContextAPI'

const EmailFilters = () => {
    const {filter, setFilter} = useEmail()
    const active = 'border bg-Read-Background px-3 rounded-full'
    const handleFilters = (filter: EmailFilterT) => setFilter(filter)

  return (
    <Fragment>
          <div className=' font-semibold'>Filter By:</div>
          <div className=' md:font-medium flex gap-3 md:gap-5'>
              <button onClick={() => handleFilters('all')} className={'all' === filter ? active : ''}>All</button>
              <button onClick={() => handleFilters('unread')} className={'unread' === filter ? active : ''}>Unread</button>
              <button onClick={() => handleFilters('read')} className={'read' === filter ? active : ''}>Read</button>
              <button onClick={() => handleFilters('favorite')} className={'favorite' === filter ? active : ''}>Favorites</button>
          </div>
    </Fragment>
  )
}

export default EmailFilters