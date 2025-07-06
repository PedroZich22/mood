// src/components/DynamicLucideIcon.jsx
import { lazy, Suspense } from 'react';
// Função para converter 'kebab-case' para 'PascalCase'
// Ex: 'activity-heart' -> 'ActivityHeart'

const kebabToPascalCase = (name) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};

const DynamicLucideIcon = ({ name, ...props }) => {
    const IconComponent = lazy(() =>
        import('lucide-react').then(module => {
            const ComponentName = kebabToPascalCase(name);
            // Retorna um objeto no formato que React.lazy espera: { default: Component }
            return { default: module[ComponentName] || module['AlertCircle'] }; // 'AlertCircle' como fallback
        })
    );

    return (
        <Suspense fallback={<div style={{ width: props.size || 24, height: props.size || 24 }} />}>
            <IconComponent {...props} />
        </Suspense>
    );
};

export default DynamicLucideIcon;