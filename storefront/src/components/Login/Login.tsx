import React, { useState } from 'react';
import type { User } from '../../types/user';
import { apiService } from '../../service/apiservice';

const Login: React.FC<{ onLogin: (token: string, user: User) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { access_token, user } = await apiService.login(username, password);
      onLogin(access_token, user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Easy Inventory</h2>
                  <p className="text-muted">Welcome back! Please sign in to your account</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger border-0 rounded-3" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold text-dark">
                    Username
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 rounded-start-3">
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 rounded-end-3 py-3"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold text-dark">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 rounded-start-3">
                      <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 rounded-end-3 py-3"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg rounded-3 fw-semibold"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;