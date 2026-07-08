import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/providers/AuthProvider';

export const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // If already logged in, redirect to account page
  useEffect(() => {
    if (user) {
      navigate('/account', { replace: true });
    }
  }, [user, navigate]);

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      
      const ALLOWED_ADMINS = ['mridulverma7676@gmail.com', 'abhaysaini082002@gmail.com', 'jewelgazm@gmail.com'];
      const isAdmin = ALLOWED_ADMINS.includes(email);

      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        isAdmin,
      };
      
      sessionStorage.setItem('adminUser', JSON.stringify(userData));
      
      // Reload the page so AuthProvider picks up the new user state automatically
      window.location.reload();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    window.location.reload();
  };

  if (user && !user.isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-background flex justify-center items-start">
        <div className="max-w-2xl w-full bg-surface p-8 md:p-12 rounded-xl border border-[#E8E0D5] shadow-sm mt-8">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-border/40">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="w-20 h-20 rounded-full border-2 border-gold/20" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-serif">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-serif text-[var(--theme-primary)]">{user.name}</h1>
              <p className="text-sm font-sans text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="border border-border/40 p-6 rounded-lg cursor-pointer hover:border-gold/50 transition-colors">
              <h3 className="font-serif text-lg text-primary mb-2">Order History</h3>
              <p className="text-xs font-sans text-primary/60">View your past purchases and track current orders. (Coming Soon)</p>
            </div>
            <div className="border border-border/40 p-6 rounded-lg cursor-pointer hover:border-gold/50 transition-colors">
              <h3 className="font-serif text-lg text-primary mb-2">Saved Addresses</h3>
              <p className="text-xs font-sans text-primary/60">Manage your shipping and billing addresses. (Coming Soon)</p>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-border/40">
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-primary text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background flex justify-center items-center">
      <div className="max-w-md w-full bg-surface p-8 md:p-12 rounded-xl border border-[#E8E0D5] shadow-sm text-center">
        <h1 className="text-3xl font-serif text-[var(--theme-primary)] mb-2">My Account</h1>
        <p className="text-sm font-sans text-gray-500 mb-8">
          Sign in to access your saved items, view past orders, or access the admin dashboard.
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap={false}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
};
