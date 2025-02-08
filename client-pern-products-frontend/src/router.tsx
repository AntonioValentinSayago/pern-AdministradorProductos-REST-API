import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import { Products } from './views/Products'
import { NewProducts } from './views/NewProducts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Products />
            },
            {
                path: 'productos/nuevo',
                element: <NewProducts />
            }
        ]
    }
])