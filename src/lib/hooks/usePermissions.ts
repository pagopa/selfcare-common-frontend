import { useSelector } from 'react-redux';
import { selectProductPermissions, ProductPermissions } from './../redux/slices/permissionsSlice';

export function usePermissions() {
  const productPermissions: Array<ProductPermissions> = useSelector(selectProductPermissions);

  // Function to check if a user has permission for a specific action.
  const hasPermission = (productId: string, action: string): boolean => {
    const product = productPermissions.find((p) => p.productId === productId);
    return product?.actions.includes(action) || false;
  };

  //  Function that returns an array of actions for a given product ID.
  const getProductPermissions = (productId: string): Array<string> => {
    const product = productPermissions.find((p) => p.productId === productId);
    return product?.actions || [];
  };

  // Function that returns an array of product IDs that have a specific action.
  const getAllProductsWithPermission = (action: string): Array<string> =>
    productPermissions
      .filter((product) => product.actions.includes(action))
      .map((product) => product.productId);

  return {
    hasPermission,
    getProductPermissions,
    getAllProductsWithPermission,
    productPermissions,
  };
}
