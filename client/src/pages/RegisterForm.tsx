import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { z } from 'zod'

// Zod schema for user data validation
const userSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
});

// TypeScript type generated from the schema
type UserFormData = z.infer<typeof userSchema>;

export function RegisterForm() {
    const [formData, setFormData] = useState<UserFormData>({
        email: 'test@example.com',
        password: 'aA1235678',
        name: 'Test User',
    });

    const auth = useAuth();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateForm = (data: UserFormData) => {
        const result = userSchema.safeParse(data);
        if (result.success) {
            setErrors({});
            return true;
        } else {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as string;
                if (field) newErrors[field] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleInputChange = (field: keyof UserFormData, value: string | number) => {
        const newFormData = { ...formData, [field]: value };
        setFormData(newFormData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();




        if (validateForm(formData)) {
            auth.register(formData.email, formData.password, formData.name);
            navigate("/posts");

        }

    };

    return (
        <>
      <div className="flex min-h-svh flex-col items-center justify-center space-y-2 p-4">

            <h1 className='font-bold'>Register</h1>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-sm mb-8">

                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.email}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                    />
                    {errors.email && (
                        <span className="text-red-600 text-sm mt-1 block">{errors.email}</span>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                    />
                    {errors.email && (
                        <span className="text-red-600 text-sm mt-1 block">{errors.email}</span>
                    )}
                </div>



                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                    />
                    {errors.password && (
                        <span className="text-red-600 text-sm mt-1 block">{errors.password}</span>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Register
                </button>
            </form>
            </div>
        </>
    )
} 