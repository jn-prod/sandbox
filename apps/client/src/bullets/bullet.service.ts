import { client } from '@/common/services/supabase.service'
import type { PostgrestError } from '@supabase/supabase-js'
import type { IBulletItem } from './bullet.conf'

/**
 * Retrieve all bullets for the signed in user
 */
export const getAll = async (): Promise<{data: null | IBulletItem[], error: null | PostgrestError}> => {
  try {
    const { data, error } = await client.from('Bullets').select('*').order('id')

    return { data, error } 
  } catch (err) {
    return {data: null, error: err as PostgrestError}
  }
}

/**
 *  Add a new bullet
 */
export const addOne = async (bullet: IBulletItem): Promise<{data: null | IBulletItem, error: null | PostgrestError}> => {
  try {
    const { data, error } = await client.from('Bullets').insert(bullet).single()

    return { data, error } 
  } catch (err) {
    return {data: null, error: err as PostgrestError}
  }
}

/**
 *  Get a bullet by id
 */
export const getById = async (bulletId: IBulletItem['id']): Promise<{data: null | IBulletItem, error: null | PostgrestError}> => {
    try {
      const { data, error } = await client.from('Bullets').select('*').eq('id', bulletId).single()
  
      return { data, error } 
    } catch (err) {
      return {data: null, error: err as PostgrestError}
    }
  }

/**
 * Targets a specific bullet via its id and updates it.
 */
export const updateById = async (bulletId: IBulletItem['id'], newValue: IBulletItem): Promise<{data: null | IBulletItem, error: null | PostgrestError}> => {
    const payload: Partial<IBulletItem> = newValue;
    delete payload.id;
  try {
    const { data, error } = await client
      .from('Bullets')
      .update(payload)
      .eq('id', bulletId)
      .single()

    return { data, error } 
  } catch (err) {
    return {data: null, error: err as PostgrestError}
  }
}

/**
 *  Deletes a bullet via its id
 */
export const deleteById = async (bulletId: IBulletItem['id']): Promise<{data: null | IBulletItem, error: null | PostgrestError}> => {
  try {
    const { data, error } = await client.from('Bullets').delete().eq('id', bulletId)
    return { data, error } 
  } catch (err) {
    return {data: null, error: err as PostgrestError}
  }
}
