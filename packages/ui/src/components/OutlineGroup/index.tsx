import { memo, useMemo, useState, type ReactElement, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A tree presentation that reveals nested children on demand.
 *
 * @see https://developer.apple.com/documentation/swiftui/outlinegroup
 */
export interface IOutlineGroupProps<Item> extends IBaseComponent {
  /**
   * Top-level tree nodes.
   */
  data: Item[]
  /**
   * Returns child nodes for a given item.
   */
  getChildren: (item: Item) => Item[] | undefined
  /**
   * Stable key extractor.
   */
  getKey: (item: Item) => string
  /**
   * Renderer for each tree item label.
   */
  renderItem: (item: Item) => ReactNode
}

function OutlineNode<Item>(props: {
  depth: number
  expandedKeys: Set<string>
  getChildren: (item: Item) => Item[] | undefined
  getKey: (item: Item) => string
  item: Item
  onToggle: (key: string) => void
  renderItem: (item: Item) => ReactNode
}) {
  const { item, getChildren, getKey, renderItem, expandedKeys, onToggle, depth } = props
  const key = getKey(item)
  const children = getChildren(item)
  const hasChildren = Boolean(children && children.length > 0)
  const expanded = expandedKeys.has(key)
  const label = renderItem(item)

  return (
    <li className={prefixClass('outlinegroup-item')} role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      <div className={prefixClass('outlinegroup-row')} style={{ paddingInlineStart: `${depth * 16}px` }}>
        {hasChildren ? (
          <button className={prefixClass('outlinegroup-toggle')} onClick={() => onToggle(key)} type="button">
            {label}
          </button>
        ) : (
          <span className={prefixClass('outlinegroup-label')}>{label}</span>
        )}
      </div>
      {hasChildren && expanded ? (
        <ul className={prefixClass('outlinegroup-children')} role="group">
          {children!.map((child) => (
            <OutlineNode
              depth={depth + 1}
              expandedKeys={expandedKeys}
              getChildren={getChildren}
              getKey={getKey}
              item={child}
              key={getKey(child)}
              onToggle={onToggle}
              renderItem={renderItem}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export const OutlineGroup = memo(function OutlineGroup<Item>(props: IOutlineGroupProps<Item>) {
  const { data, getChildren, getKey, renderItem, ...restProps } = props
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('outlinegroup'),
  })
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set())

  const onToggle = useMemo(() => {
    return (key: string) => {
      setExpandedKeys((current) => {
        const next = new Set(current)
        if (next.has(key)) {
          next.delete(key)
        } else {
          next.add(key)
        }
        return next
      })
    }
  }, [])

  return (
    <div {...commonProps} {...finalRestProps}>
      <ul className={prefixClass('outlinegroup-tree')} role="tree">
        {data.map((item) => (
          <OutlineNode
            depth={0}
            expandedKeys={expandedKeys}
            getChildren={getChildren}
            getKey={getKey}
            item={item}
            key={getKey(item)}
            onToggle={onToggle}
            renderItem={renderItem}
          />
        ))}
      </ul>
    </div>
  )
}) as <Item>(props: IOutlineGroupProps<Item>) => ReactElement
