import { formatPrice, MENU_FILTERS, type MenuCategory, type MenuItem } from '../constants/menu'
import { STOCK_CATEGORIES, formatQty, statusClass, type StockCategory, type StockItem } from '../constants/stock'

type RailTab = 'stock' | 'menu'

type InventoryRailProps = {
  tab: RailTab
  query: string
  category: 'All Items' | StockCategory
  items: StockItem[]
  selectedId: string
  menuCategory: 'All' | MenuCategory
  menuItems: MenuItem[]
  menuSelectedId: string
  onTab: (tab: RailTab) => void
  onQuery: (query: string) => void
  onCategory: (category: 'All Items' | StockCategory) => void
  onSelect: (id: string) => void
  onMenuCategory: (category: 'All' | MenuCategory) => void
  onMenuSelect: (id: string) => void
  onAdd: () => void
  onAddMenu: () => void
}

export function InventoryRail({
  tab,
  query,
  category,
  items,
  selectedId,
  menuCategory,
  menuItems,
  menuSelectedId,
  onTab,
  onQuery,
  onCategory,
  onSelect,
  onMenuCategory,
  onMenuSelect,
  onAdd,
  onAddMenu,
}: InventoryRailProps) {
  const menu = tab === 'menu'

  return (
    <aside className="inv-rail" aria-label={menu ? 'Menu' : 'Inventory'}>
      <h1>{menu ? 'Menu' : 'Inventory'}</h1>
      <div className="inv-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'stock'}
          className={tab === 'stock' ? 'is-active' : ''}
          onClick={() => onTab('stock')}
        >
          <BoxIcon />
          Stock
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'menu'}
          className={tab === 'menu' ? 'is-active' : ''}
          onClick={() => onTab('menu')}
        >
          <MenuIcon />
          Menu
        </button>
      </div>

      <div className={menu ? 'inv-stats is-menu' : 'inv-stats'}>
        <article>
          <p>{menu ? '16 available' : '7 alerts'}</p>
        </article>
        <article>
          <p>{menu ? '18 items' : '₹17,524 value'}</p>
        </article>
      </div>

      {menu ? null : (
        <label className="inv-search">
          <span className="sr-only">Search items or supplier</span>
          <input
            type="search"
            value={query}
            placeholder="Search items or supplier..."
            onChange={(event) => onQuery(event.target.value)}
          />
        </label>
      )}

      <div className={menu ? 'inv-filters is-menu' : 'inv-filters'}>
        {menu ? (
          <>
            <div>
              {MENU_FILTERS.slice(0, 2).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={name === menuCategory ? 'is-active' : ''}
                  onClick={() => onMenuCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div>
              {MENU_FILTERS.slice(2).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={name === menuCategory ? 'is-active' : ''}
                  onClick={() => onMenuCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        ) : (
          STOCK_CATEGORIES.map((name) => (
            <button
              key={name}
              type="button"
              className={name === category ? 'is-active' : ''}
              onClick={() => onCategory(name)}
            >
              {name}
            </button>
          ))
        )}
      </div>

      <div className="inv-list">
        {menu
          ? menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === menuSelectedId ? 'inv-item is-selected is-menu' : 'inv-item is-menu'}
                onClick={() => onMenuSelect(item.id)}
              >
                <MenuGlyph id={item.id} />
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.description}</em>
                </span>
                <span className="inv-item-side">
                  <b>{formatPrice(item.price)}</b>
                  <i className={item.available ? 'is-ok' : 'is-off'}>{item.available ? 'On' : 'Off'}</i>
                </span>
              </button>
            ))
          : items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selectedId ? 'inv-item is-selected' : 'inv-item'}
                onClick={() => onSelect(item.id)}
              >
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.supplier}</em>
                </span>
                <span className="inv-item-side">
                  <i className={statusClass(item.status)}>{item.status}</i>
                  <b className={item.status === 'Out of Stock' ? 'is-out' : ''}>
                    {formatQty(item.quantity, item.unit)}
                  </b>
                </span>
              </button>
            ))}
      </div>

      <div className="inv-add">
        <button type="button" onClick={menu ? onAddMenu : onAdd}>
          {menu ? '+ Add Menu Item' : '+ Add Item'}
        </button>
      </div>
    </aside>
  )
}

function MenuGlyph({ id }: { id: string }) {
  const tone = GLYPHS[id] ?? 'cream'
  return (
    <span className={`menu-glyph is-${tone}`} aria-hidden="true">
      <GlyphShape id={id} />
    </span>
  )
}

function GlyphShape({ id }: { id: string }) {
  if (id === 'oat-milk-latte' || id === 'avocado-toast') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M8 13.2C8 13.2 3.2 9.4 3.2 6.4a2.4 2.4 0 0 1 4.2-1.6A2.4 2.4 0 0 1 12.8 6.4c0 3-4.8 6.8-4.8 6.8Z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    )
  }
  if (id === 'cold-brew' || id === 'hazelnut-cold-brew') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M4.2 4.2h7.6v7.6H4.2V4.2Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.2 2.8h3.6M6.2 13.2h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  }
  if (
    id === 'espresso' ||
    id === 'americano' ||
    id === 'cappuccino' ||
    id === 'latte' ||
    id === 'flat-white' ||
    id === 'iced-latte' ||
    id === 'vanilla-frappe' ||
    id === 'cardamom-chai'
  ) {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M5 4.2h6.2v6.2a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 10.4V4.2Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 2.6c.3.5.3 1 0 1.5M9 2.6c.3.5.3 1 0 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'nimbu-soda') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <circle cx="8" cy="8" r="4.2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 3.8v8.4M4.6 6.2c1.2.8 2.2.8 3.4 0 1.2.8 2.2.8 3.4 0" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  }
  if (id === 'butter-croissant' || id === 'banana-bread') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M3.4 10.6c1.6-3.8 7.6-3.8 9.2 0-2.2 1.6-7 1.6-9.2 0Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.2 9.4c1 .8 2.2 1.2 2.8 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'granola-bowl') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M3.2 7.2h9.6c-.4 3.2-2.2 4.8-4.8 4.8s-4.4-1.6-4.8-4.8Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 5.2h.1M8 4.4h.1M10 5.2h.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'seasonal-special') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M8 2.6 9.1 6h3.5L10 8.1l1.1 3.5L8 9.6 4.9 11.6 6 8.1 3.4 6h3.5L8 2.6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <path d="M3.2 6.2h9.6v6.2H3.2V6.2Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.2 8.4h9.6M8 6.2v6.2M5.4 6.2 6.6 4.2h2.8l1.2 2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

const GLYPHS: Record<string, string> = {
  espresso: 'cream',
  americano: 'cream',
  cappuccino: 'cream',
  latte: 'cream',
  'flat-white': 'cream',
  'oat-milk-latte': 'green',
  'cardamom-chai': 'cream',
  'cold-brew': 'blue',
  'iced-latte': 'pink',
  'vanilla-frappe': 'pink',
  'hazelnut-cold-brew': 'blue',
  'nimbu-soda': 'gold',
  'butter-croissant': 'gold',
  'banana-bread': 'gold',
  'avocado-toast': 'green',
  'granola-bowl': 'lilac',
  'seasonal-special': 'gold',
  'loyalty-bundle': 'pink',
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M2.5 5.2 8 2.8l5.5 2.4V11L8 13.2 2.5 11V5.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M2.6 5.3 8 7.6l5.4-2.3M8 7.6v5.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M3 3.2h10M3 8h10M3 12.8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export type { RailTab }
