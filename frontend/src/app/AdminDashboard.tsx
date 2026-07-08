import React, { useEffect, useState } from 'react';
import { shopifyMockClient, updateMockProduct } from '@/lib/shopify/mockClient';
import { Product } from '@/lib/shopify/types';
import { Edit2, Save, X, Search, Filter } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMetal, setFilterMetal] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterGender, setFilterGender] = useState('All');
  
  
  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await shopifyMockClient.getProducts();
    // Sort alphabetically by title
    data.sort((a, b) => a.title.localeCompare(b.title));
    setProducts(data);
    setLoading(false);
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditTitle(product.title);
    setEditDescription(product.description);
    setEditPrice(product.priceRange.minVariantPrice.amount);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = (product: Product) => {
    // Clone product
    const updatedProduct = JSON.parse(JSON.stringify(product)) as Product;
    
    // Update title and description
    updatedProduct.title = editTitle;
    updatedProduct.description = editDescription;
    
    // Update price (assuming variants share the same base price in this mock)
    updatedProduct.priceRange.minVariantPrice.amount = editPrice;
    if (updatedProduct.variants.edges.length > 0) {
      updatedProduct.variants.edges.forEach(edge => {
        edge.node.price.amount = editPrice;
      });
    }

    // Save to localStorage
    updateMockProduct(updatedProduct);
    
    // Update local state to reflect UI changes instantly
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingId(null);
  };

  if (loading) {
    return <div className="min-h-screen pt-32 px-4 flex justify-center text-[var(--theme-primary)]">Loading Inventory...</div>;
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--theme-primary)] mb-2">Inventory Management</h1>
            <p className="text-sm text-gray-500">Logged in as: {user?.email}</p>
          </div>
          
          <button 
            onClick={logout}
            className="px-6 py-2 bg-surface border border-[var(--theme-primary)] text-[var(--theme-primary)] rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-xl shadow-sm border border-[#E8E0D5] p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E8E0D5] rounded-lg text-sm focus:outline-none focus:border-[var(--theme-primary)] font-sans"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select 
              value={filterMetal} 
              onChange={(e) => setFilterMetal(e.target.value)}
              className="px-3 py-2 border border-[#E8E0D5] rounded-lg text-sm focus:outline-none font-sans bg-surface"
            >
              <option value="All">All Metals</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-[#E8E0D5] rounded-lg text-sm focus:outline-none font-sans bg-surface"
            >
              <option value="All">All Types</option>
              {Array.from(new Set(products.map(p => p.productType))).filter(Boolean).sort().map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select 
              value={filterGender} 
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3 py-2 border border-[#E8E0D5] rounded-lg text-sm focus:outline-none font-sans bg-surface"
            >
              <option value="All">All Genders</option>
              <option value="Gents">Gents</option>
              <option value="Ladies">Ladies</option>
            </select>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-[#E8E0D5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-[#E8E0D5]">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (INR)</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {['Gold', 'Silver', 'Other'].map(category => {
                  let groupProducts = [];
                  
                  const filteredProducts = products.filter(p => {
                    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
                    let matchesMetal = true;
                    if (filterMetal === 'Gold') matchesMetal = p.tags.includes('Gold');
                    if (filterMetal === 'Silver') matchesMetal = p.tags.includes('Silver');
                    let matchesType = filterType === 'All' || p.productType === filterType;
                    let matchesGender = filterGender === 'All' || p.tags.includes(filterGender);
                    
                    return matchesSearch && matchesMetal && matchesType && matchesGender;
                  });

                  if (category === 'Gold') groupProducts = filteredProducts.filter(p => p.tags.includes('Gold'));
                  else if (category === 'Silver') groupProducts = filteredProducts.filter(p => p.tags.includes('Silver'));
                  else groupProducts = filteredProducts.filter(p => !p.tags.includes('Gold') && !p.tags.includes('Silver'));

                  if (groupProducts.length === 0) return null;

                  // Sort by Gender (Gents first), then ProductType, then Title
                  groupProducts.sort((a, b) => {
                    const genA = a.tags.includes('Gents') ? 1 : 2;
                    const genB = b.tags.includes('Gents') ? 1 : 2;
                    if (genA !== genB) return genA - genB;
                    if (a.productType !== b.productType) return a.productType.localeCompare(b.productType);
                    return a.title.localeCompare(b.title);
                  });

                  return (
                    <React.Fragment key={category}>
                      <tr className="bg-background">
                        <td colSpan={4} className="py-3 px-6 text-sm font-serif font-medium text-[var(--theme-primary)] uppercase tracking-widest border-b border-[#E8E0D5]">
                          {category} Collection
                        </td>
                      </tr>
                      {groupProducts.map(product => (
                        <tr key={product.id} className="border-b border-border/40 last:border-0 hover:bg-surface-hover transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img 
                                src={product.images.edges[0]?.node.url} 
                                alt={product.title} 
                                className="w-24 h-24 rounded-md object-cover border border-gray-200"
                              />
                              {editingId === product.id ? (
                                <div className="flex flex-col gap-2 w-full max-w-sm">
                                  <input 
                                    type="text" 
                                    value={editTitle} 
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--theme-primary)]"
                                    placeholder="Product Title"
                                  />
                                  <textarea 
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--theme-primary)] min-h-[80px] resize-y"
                                    placeholder="Product Description"
                                  />
                                </div>
                              ) : (
                                <span className="font-serif text-gray-800">{product.title}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500">
                            {product.productType} {product.tags.includes('Gents') ? '(Gents)' : '(Ladies)'}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-800">
                            {editingId === product.id ? (
                              <div className="flex items-center gap-1">
                                <span>₹</span>
                                <input 
                                  type="number" 
                                  value={editPrice} 
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="border border-gray-300 rounded px-2 py-1 w-24 text-sm focus:outline-none focus:border-[var(--theme-primary)]"
                                />
                              </div>
                            ) : (
                              `₹${product.priceRange.minVariantPrice.amount}`
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {editingId === product.id ? (
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleSave(product)}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={handleCancelEdit}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleEditClick(product)}
                                className="p-1.5 text-primary/40 hover:text-[var(--theme-primary)] hover:bg-surface-hover rounded transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

