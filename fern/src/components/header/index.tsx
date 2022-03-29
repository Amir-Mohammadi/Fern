import Button from '@Components/button';
import {
  AddLocation,
  Avatar,
  Cart,
  Close,
  DiscountProduct,
  FlashDown,
  Icons,
  Logo as LogoIcon,
  Menu,
  ProductSeller,
  Search,
} from '@Components/icons';
import Logo from '@Components/logo';
import { Mode } from '@Constants/colors';
import { PageUrls } from '@Constants/page-urls';
import { faBars, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { urlService } from '@Services/url';
import { IProductsSearchParameters } from '@Stores/search-page-store';
import classNames from 'classnames';
import React, { useState } from 'react';
import CartItemSummary from '../cart-item-summary';
import ProfileSummary from '../profile-summary';
import SearchResult from '../search-result';
import styles from './header.module.scss';

interface Props {
  searchInput?: {
    value: string;
    onChange: (v: string) => void;
  };
  user?: IUser;
  userFullName?: string | null;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  categoryLists?: Array<ICategoryTree>;
  cart?: IBriefCart;
}

export interface ICategoryTree {
  name: string;
  child: ICategoryTree[];
  id: number;
  meta_description: string;
}

export type HeaderProps = Props;

const generateSearchUrl = (options: IProductsSearchParameters): string => {
  return urlService.searchUrlService.createSearchUrl(options);
};
const Header: React.FC<HeaderProps> = (props) => {
  const [categoryShow, setCategoryShow] = useState<'category' | 'phoneNav' | 'cart' | 'profile' | 'none'>('none');
  const [searchResult, setSearchResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onEnterPressed = (event: any) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      props.onSearch ? props.onSearch(searchQuery) : null;
      setSearchQuery('');
    }
  };
  console.log(props);

  return (
    <div className={styles.header}>
      <div className={styles.main}>
        <div className={styles.headerRightSide}>
          <div className={styles.navToggle} onClick={() => setCategoryShow('phoneNav')}>
            <FontAwesomeIcon color={'#707070'} icon={faBars} />
          </div>
          <div className={styles.headerLogo}>
            <a href={PageUrls.Home}>
              <Logo color={Mode.danger} secondColor={Mode.success} />
            </a>
          </div>
        </div>
        <div className={styles.headerAction}>
          <div className={styles.headerSearch}>
            <div
              className={classNames({
                [styles.searchBX]: true,
                [styles.open]: searchResult,
              })}>
              <div className={styles.searchGroup}>
                <Icons icon={Search} size={24} color="#707070" />
                <input
                  type="search"
                  placeholder="در السل جستجو کن…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onKeyPress={(e) => onEnterPressed(e)}
                  onFocus={() => setSearchResult(true)}
                  onBlur={() => {
                    setSearchResult(false);
                  }}
                />
                {props.searchInput?.value.length ? <Icons icon={Close} size={24} color="#707070" /> : null}
              </div>
              {searchResult ? (
                <div>
                  <SearchResult searchResult={[]} />
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.actionBar}>
            {props.user ? (
              <div
                className={styles.userAction}
                onMouseEnter={() => {
                  setCategoryShow('profile');
                }}
                onMouseLeave={() => {
                  setCategoryShow('none');
                }}>
                <a href={PageUrls.Profile} className={styles.userText}>
                  حساب کاربری &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                </a>
                <a href={PageUrls.Profile}>
                  <Icons icon={Avatar} size={20} color="#707070" />
                </a>
                <div style={{ alignSelf: 'flex-end', paddingRight: '8px' }}>
                  <Icons icon={FlashDown} size={6} color="#707070" />
                </div>

                {categoryShow == 'profile' && props.onLogout ? (
                  <div className={styles.profileBX}>
                    <ProfileSummary userFullName={props.userFullName ?? ''} onLogout={props.onLogout} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className={styles.userAction}
                onMouseEnter={() => {
                  setCategoryShow('profile');
                }}
                onMouseLeave={() => {
                  setCategoryShow('none');
                }}>
                <a href={PageUrls.LoginRegister} className={styles.userText}>
                  ورود به حساب کاربری&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                </a>

                {categoryShow == 'profile' ? <div className={styles.profileBX}></div> : null}
              </div>
            )}
            <div
              className={styles.cartAction}
              onMouseEnter={() => {
                setCategoryShow('cart');
              }}
              onMouseLeave={() => {
                setCategoryShow('none');
              }}>
              <a href={PageUrls.Cart}>
                <Icons icon={Cart} size={30} color="#707070" />
              </a>

              {props.cart?.cartItems.length && categoryShow == 'cart' && props.cart ? (
                <div className={styles.cartBX}>
                  <CartItemSummary cart={props.cart} Submit={() => (window.location.href = PageUrls.Shipping)} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <nav className={styles.menu}>
        <div className={styles.navContainer}>
          <ul className={styles.navItems}>
            <li className={styles.menuContainer}>
              <ul className={styles.menuItems}>
                <li
                  style={{ position: 'relative' }}
                  onMouseEnter={() => {
                    setCategoryShow('category');
                  }}
                  onMouseLeave={() => {
                    setCategoryShow('none');
                  }}>
                  <a>
                    <Icons icon={Menu} size={19} color="#5D5D5D" />
                    &nbsp; دسته بندی کالاها
                  </a>
                  <span
                    style={{
                      margin: '0 20px',
                      borderLeft: '1px solid #c9c9c9',
                    }}></span>
                  {categoryShow == 'category' && props.categoryLists && (
                    <CreateCategoryTree node={props.categoryLists} />
                  )}
                </li>
                <li>
                  <a>
                    <Icons icon={LogoIcon} size={18} color="#5D5D5D" />
                    &nbsp; السل من
                  </a>
                  <span
                    style={{
                      margin: '0 20px',
                      borderLeft: '1px solid #c9c9c9',
                    }}></span>
                </li>
                <li>
                  <a>السل کلاب</a>
                  <span
                    style={{
                      margin: '0 20px',
                      borderLeft: '1px solid #c9c9c9',
                    }}></span>
                </li>
                <li>
                  <a>
                    <Icons icon={DiscountProduct} size={19} color="#5D5D5D" />
                    &nbsp; کالاهای تخفیف دار
                  </a>
                  <span
                    style={{
                      margin: '0 20px',
                      borderLeft: '1px solid #c9c9c9',
                    }}></span>
                </li>
                <li>
                  <a>سوالات متداول</a>
                  <span
                    style={{
                      margin: '0 20px',
                      borderLeft: '1px solid #c9c9c9',
                    }}></span>
                </li>
                <li>
                  <a>
                    <Icons icon={ProductSeller} size={22} color="#5D5D5D" />
                    &nbsp; درخواست فروشنگی
                  </a>
                </li>
              </ul>
            </li>
            <li className={styles.locationContainer}>
              <a>
                در کدام شهر زندگی می کنید؟ &nbsp;
                <Icons icon={AddLocation} size={23} color="#DB0060" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {categoryShow == 'phoneNav' ? (
        <div
          className={styles.phoneNavbar}
          tabIndex={1}
          onBlur={() => {
            setCategoryShow('none');
          }}>
          <div className={styles.content}>
            <div className={styles.head}>
              <Button.Basic onClick={() => setCategoryShow('none')}>
                <FontAwesomeIcon icon={faTimes} />
              </Button.Basic>
              <div className={styles.headerLogo}>
                <Logo color={Mode.danger} secondColor={Mode.success} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;

const CreateCategoryTree: React.FC<{ node: ICategoryTree[] }> = (nodes) => {
  const [subMenu, setSubMenu] = useState(-1);

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryContent} style={{}}>
        {nodes.node.map((item, i) => {
          console.log(item.name);

          return (
            <div
              className={styles.categoryItem}
              onMouseEnter={() => {
                if (nodes.node[i].child.length > 0) {
                  setSubMenu(i);
                }
              }}
              onMouseLeave={() => {
                setSubMenu(-1);
              }}
              key={item.id}>
              <a href={generateSearchUrl({ categoryId: item.id })} className={styles.categoryTitle}>
                {item.name}
                {item.child.length > 0 && <FontAwesomeIcon icon={faChevronLeft} size={'sm'} width={'10px'} />}
              </a>
              {subMenu == i && nodes.node[subMenu].child.length > 0 && (
                <div className={styles.subMenu} style={{ flex: 'none' }}>
                  <CreateCategoryTree node={nodes.node[subMenu].child} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
