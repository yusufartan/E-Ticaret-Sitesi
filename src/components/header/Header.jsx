import React, { useState, useEffect } from 'react';
import logo from '../../assets/photos/yusuf-giyim-logo.png';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/settings/settingsSlice';
import { IoCloseCircleOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { setDrawer } from '../../redux/slices/basketSlice';




function Header() {
  const [search, setSearch] = useState('');
  const { theme } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector(store => store.basket);


  // Body arka planını tema ile değiştir
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const clearSearch = () => setSearch('');

  return (
    <div className={`header-container ${theme}`}>
      <div className='logo-section flex-row' onClick={() => navigate('/')}>
        <img className='logo' src={logo} alt="Yusuf Giyim Logo" />
        <p className='logoText'>Yusuf A.Ş</p>
      </div>

      <div className='search-section flex-row'>
        <input
          className='SearchInput'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder='Aradığınız ürün, kategori veya markayı yazınız'
        />

        <div className='icons flex-row'>

          <Badge onClick={()=>dispatch(setDrawer())} badgeContent={products.length} color="error" style={{ marginRight: 15 }}>
            {search && <IoCloseCircleOutline className='icon' onClick={clearSearch} />}
            <CiShoppingBasket className='icon' />
          </Badge>
          {theme === 'dark'
            ? <IoSunnyOutline className='icon' onClick={() => dispatch(toggleTheme())} />
            : <IoMoonOutline className='icon' onClick={() => dispatch(toggleTheme())} />
          }
        </div>
       
      </div>
    </div>
  );
}

export default Header;
