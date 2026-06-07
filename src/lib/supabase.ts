// Mock Supabase Client - Fonctionne sans base de données réelle
// Remplacez par les vraies clés Supabase pour la production

const mockData = {
  properties: [
    { id: '1', title: 'Villa Cocody', city: 'Abidjan', price: 85000000, status: 'available', listing_type: 'sale', property_type: 'villa', bedrooms: 5, bathrooms: 3, area_sqm: 350, is_featured: true, rating: 4.9, created_at: '2025-01-01' },
    { id: '2', title: 'Appartement Plateau', city: 'Abidjan', price: 450000, status: 'available', listing_type: 'rent', property_type: 'apartment', bedrooms: 3, bathrooms: 2, area_sqm: 120, is_featured: false, rating: 4.8, created_at: '2025-01-02' },
  ],
  users: [],
  property_images: [],
  favorites: [],
}

// Mock Supabase client
const createMockQuery = () => {
  let data: any[] = []
  let tableName = ''
  let filters: any = {}
  let singleResult = false
  let countQuery = false
  let selectedColumns = '*'
  let orderColumn = ''
  let orderDirection = 'asc'
  let rangeStart = 0
  let rangeEnd = 10

  const query = {
    from: (table: string) => {
      tableName = table
      return query
    },
    select: (columns: string = '*', options?: any) => {
      selectedColumns = columns
      if (options?.count === 'exact') countQuery = true
      return query
    },
    insert: (records: any) => {
      return query
    },
    update: (updates: any) => {
      return query
    },
    delete: () => {
      return query
    },
    eq: (column: string, value: any) => {
      filters[column] = value
      return query
    },
    neq: (column: string, value: any) => {
      return query
    },
    gt: (column: string, value: any) => {
      return query
    },
    gte: (column: string, value: any) => {
      return query
    },
    lt: (column: string, value: any) => {
      return query
    },
    lte: (column: string, value: any) => {
      return query
    },
    like: (column: string, value: string) => {
      return query
    },
    ilike: (column: string, value: string) => {
      filters[column + '_ilike'] = value.replace(/%/g, '')
      return query
    },
    is: (column: string, value: any) => {
      return query
    },
    in: (column: string, values: any[]) => {
      return query
    },
    order: (column: string, options?: { ascending?: boolean }) => {
      orderColumn = column
      orderDirection = options?.ascending === false ? 'desc' : 'asc'
      return query
    },
    range: (from: number, to: number) => {
      rangeStart = from
      rangeEnd = to
      return query
    },
    limit: (count: number) => {
      rangeEnd = count
      return query
    },
    single: () => {
      singleResult = true
      return query
    },
    then: (callback: Function) => {
      // Simuler une réponse asynchrone
      setTimeout(() => {
        let result = mockData[tableName as keyof typeof mockData] || []
        
        // Appliquer les filtres
        Object.entries(filters).forEach(([key, value]) => {
          if (key.endsWith('_ilike')) {
            const col = key.replace('_ilike', '')
            result = result.filter((item: any) => 
              item[col]?.toLowerCase().includes(String(value).toLowerCase())
            )
          } else {
            result = result.filter((item: any) => item[key] === value)
          }
        })

        // Trier
        if (orderColumn) {
          result.sort((a: any, b: any) => {
            if (orderDirection === 'asc') return a[orderColumn] > b[orderColumn] ? 1 : -1
            return a[orderColumn] < b[orderColumn] ? 1 : -1
          })
        }

        // Paginer
        const total = result.length
        result = result.slice(rangeStart, rangeEnd + 1)

        const response: any = { data: singleResult ? result[0] || null : result, error: null }
        if (countQuery) response.count = total
        
        callback(response)
      }, 100)
      return Promise.resolve({ data: [], error: null })
    },
  }

  return query
}

// Client mocké
export const supabase = {
  from: (table: string) => createMockQuery().from(table),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: ({ email, password }: any) => 
      Promise.resolve({ data: { user: { id: '1', email } }, error: null }),
    signUp: ({ email, password }: any) => 
      Promise.resolve({ data: { user: { id: '1', email } }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: Function) => {
      callback('SIGNED_OUT', null)
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    resetPasswordForEmail: (email: string) => Promise.resolve({ error: null }),
  },
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: any) => Promise.resolve({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
  },
}

// Client admin (même mock)
export const supabaseAdmin = supabase
