import { useMemo, useState } from 'react'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import '@/pages/Dashboard/Dashboard.css'
import { AddItemModal, type NewStockDraft } from './components/AddItemModal'
import { AddMenuModal, type NewMenuDraft } from './components/AddMenuModal'
import { InventoryRail, type RailTab } from './components/InventoryRail'
import { MenuDetail } from './components/MenuDetail'
import { StockDetail } from './components/StockDetail'
import { MENU_ITEMS, type MenuCategory, type MenuItem } from './constants/menu'
import { STOCK_ITEMS, type StockCategory, type StockItem, type StockStatus } from './constants/stock'
import './Inventory.css'

type InventoryPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

export function InventoryPage({
  employeeName,
  employeeRole,
  employeeGradient,
}: InventoryPageProps) {
  const [tab, setTab] = useState<RailTab>('stock')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All Items' | StockCategory>('All Items')
  const [items, setItems] = useState<StockItem[]>(STOCK_ITEMS)
  const [selectedId, setSelectedId] = useState(STOCK_ITEMS[0].id)
  const [adding, setAdding] = useState(false)
  const [addingMenu, setAddingMenu] = useState(false)
  const [editingMenu, setEditingMenu] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS)
  const [menuCategory, setMenuCategory] = useState<'All' | MenuCategory>('All')
  const [menuSelectedId, setMenuSelectedId] = useState(MENU_ITEMS[0].id)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter((item) => {
      const inCategory = category === 'All Items' || item.category === category
      const inQuery =
        needle.length === 0 ||
        item.name.toLowerCase().includes(needle) ||
        item.supplier.toLowerCase().includes(needle)
      return inCategory && inQuery
    })
  }, [items, category, query])

  const selected = items.find((item) => item.id === selectedId) ?? visible[0]

  const visibleMenu = useMemo(
    () => menuItems.filter((item) => menuCategory === 'All' || item.category === menuCategory),
    [menuItems, menuCategory],
  )
  const selectedMenu = menuItems.find((item) => item.id === menuSelectedId) ?? visibleMenu[0]

  const restock = () => {
    if (!selected) return
    setItems((current) =>
      current.map((item) => {
        if (item.id !== selected.id) return item
        const added =
          item.minimum != null && item.quantity < item.minimum
            ? Math.round((item.minimum - item.quantity) * 10) / 10
            : 1
        const nextQty = Math.round((item.quantity + added) * 10) / 10
        return {
          ...item,
          quantity: nextQty,
          status: item.minimum != null && nextQty < item.minimum ? 'Low' : 'In Stock',
          lastRestocked: '2026-09-18',
          history: [
            {
              date: '2026-09-18',
              by: 'Sagar M.',
              qty: `+${added} ${item.unit}`,
              cost: item.unitCost ? `₹${Math.round(added * item.unitCost).toLocaleString('en-IN')}` : '',
            },
            ...item.history,
          ],
        }
      }),
    )
  }

  const addItem = (draft: NewStockDraft) => {
    const id = `item-${Date.now()}`
    const status: StockStatus =
      draft.quantity <= 0 ? 'Out of Stock' : draft.quantity < draft.minimum ? 'Low' : 'In Stock'
    const item: StockItem = {
      id,
      name: draft.name,
      supplier: draft.supplier,
      category: draft.category,
      status,
      quantity: draft.quantity,
      unit: draft.unit,
      minimum: draft.minimum,
      unitCost: draft.unitCost,
      history: [],
    }
    setItems((current) => [...current, item])
    setSelectedId(id)
    setTab('stock')
    setCategory('All Items')
    setQuery('')
    setAdding(false)
  }

  const remove = () => {
    if (!selected) return
    setItems((current) => {
      const next = current.filter((item) => item.id !== selected.id)
      setSelectedId(next[0]?.id ?? '')
      return next
    })
  }

  const toggleMenu = () => {
    if (!selectedMenu) return
    setMenuItems((current) =>
      current.map((item) => (item.id === selectedMenu.id ? { ...item, available: !item.available } : item)),
    )
  }

  const removeMenu = () => {
    if (!selectedMenu) return
    setMenuItems((current) => {
      const next = current.filter((item) => item.id !== selectedMenu.id)
      setMenuSelectedId(next[0]?.id ?? '')
      return next
    })
  }

  const addMenu = (draft: NewMenuDraft) => {
    const id = `menu-${Date.now()}`
    setMenuItems((current) => [
      ...current,
      {
        id,
        name: draft.name,
        description: draft.description,
        category: draft.category,
        price: draft.price,
        available: true,
        ordersToday: 0,
        weeklyAvg: 0,
      },
    ])
    setMenuSelectedId(id)
    setMenuCategory('All')
    setTab('menu')
    setAddingMenu(false)
  }

  const saveMenu = (draft: NewMenuDraft) => {
    if (!selectedMenu) return
    setMenuItems((current) =>
      current.map((item) =>
        item.id === selectedMenu.id
          ? {
              ...item,
              name: draft.name,
              category: draft.category,
              price: draft.price,
              description: draft.description,
            }
          : item,
      ),
    )
    setEditingMenu(false)
  }

  return (
    <div className="inv-page">
      <div className="inv-shell" inert={adding || addingMenu || editingMenu}>
        <div className="inv-workspace">
          <InventoryRail
            tab={tab}
            query={query}
            category={category}
            items={tab === 'stock' ? visible : []}
            selectedId={selectedId}
            menuCategory={menuCategory}
            menuItems={visibleMenu}
            menuSelectedId={menuSelectedId}
            onTab={setTab}
            onQuery={setQuery}
            onCategory={setCategory}
            onSelect={setSelectedId}
            onMenuCategory={setMenuCategory}
            onMenuSelect={setMenuSelectedId}
            onAdd={() => setAdding(true)}
            onAddMenu={() => setAddingMenu(true)}
          />
          <div className="inv-center">
            {tab === 'menu' && selectedMenu ? (
              <MenuDetail
                item={selectedMenu}
                onToggle={toggleMenu}
                onRemove={removeMenu}
                onEdit={() => setEditingMenu(true)}
              />
            ) : selected ? (
              <StockDetail item={selected} onRestock={restock} onRemove={remove} />
            ) : null}
          </div>
        </div>
        <DashboardSidebar
          employeeName={employeeName}
          employeeRole={employeeRole}
          employeeGradient={employeeGradient}
        />
      </div>
      {adding ? <AddItemModal onClose={() => setAdding(false)} onAdd={addItem} /> : null}
      {addingMenu ? <AddMenuModal onClose={() => setAddingMenu(false)} onAdd={addMenu} /> : null}
      {editingMenu && selectedMenu ? (
        <AddMenuModal
          title="Edit Menu Item"
          submitLabel="Save"
          initial={{
            name: selectedMenu.name,
            category: selectedMenu.category,
            price: selectedMenu.price,
            description: selectedMenu.description,
          }}
          onClose={() => setEditingMenu(false)}
          onAdd={saveMenu}
        />
      ) : null}
    </div>
  )
}
