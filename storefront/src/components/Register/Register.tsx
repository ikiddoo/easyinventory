import React, { useState } from 'react';
import type { User } from '../../types/user';
import { apiService } from '../../service/apiservice';


const Register: React.FC<{ onRegister: (token: string, user: User) => void; onBackToLogin: () => void }> = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    email: '',
    mobile: '',
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { access_token, user } = await apiService.register(formData);
      onRegister(access_token, user);
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
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Create Account</h2>
                  <p className="text-muted">Join Easy Inventory to manage your products</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger border-0 rounded-3" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label htmlFor="fullname" className="form-label fw-semibold text-dark">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 rounded-start-3">
                          <i className="bi bi-person-fill text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 rounded-end-3 py-3"
                          id="fullname"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dob" className="form-label fw-semibold text-dark">
                        Date of Birth
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 rounded-start-3">
                          <i className="bi bi-calendar text-muted"></i>
                        </span>
                        <input
                          type="date"
                          className="form-control border-start-0 rounded-end-3 py-3"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="mobile" className="form-label fw-semibold text-dark">
                        Mobile Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 rounded-start-3">
                          <i className="bi bi-phone text-muted"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control border-start-0 rounded-end-3 py-3"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter mobile number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 rounded-start-3">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 rounded-end-3 py-3"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

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
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-3 fw-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      className="btn btn-link p-0 text-primary fw-semibold text-decoration-none"
                      onClick={onBackToLogin}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;