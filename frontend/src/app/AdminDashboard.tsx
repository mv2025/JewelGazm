import React, { useEffect, useState } from 'react';
import { shopifyMockClient, updateMockProduct } from '@/lib/shopify/mockClient';
import { Product } from '@/lib/shopify/types';
import { Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
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
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--theme-primary)] mb-2">Inventory Management</h1>
            <p className="text-sm text-gray-500">Logged in as: {user?.email}</p>
          </div>
          
          <button 
            onClick={logout}
            className="px-6 py-2 bg-white border border-[var(--theme-primary)] text-[var(--theme-primary)] rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--theme-bg-alt)] border-b border-[#E8E0D5]">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (INR)</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {['Gold', 'Silver', 'Other'].map(category => {
                  let groupProducts = [];
                  if (category === 'Gold') groupProducts = products.filter(p => p.tags.includes('Gold'));
                  else if (category === 'Silver') groupProducts = products.filter(p => p.tags.includes('Silver'));
                  else groupProducts = products.filter(p => !p.tags.includes('Gold') && !p.tags.includes('Silver'));

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
                      <tr className="bg-[#FAF8F5]">
                        <td colSpan={4} className="py-3 px-6 text-sm font-serif font-medium text-[var(--theme-primary)] uppercase tracking-widest border-b border-[#E8E0D5]">
                          {category} Collection
                        </td>
                      </tr>
                      {groupProducts.map(product => (
                        <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img 
                                src={product.images.edges[0]?.node.url} 
                                alt={product.title} 
                                className="w-12 h-12 rounded object-cover border border-gray-200"
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
                                className="p-1.5 text-gray-400 hover:text-[var(--theme-primary)] hover:bg-gray-100 rounded transition-colors"
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
