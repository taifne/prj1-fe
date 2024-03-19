import FormGroup from '@/components/Shared/form-group';
import cn from '@/utils/class-names';
import ProductAvailability from '@/components/Shared/ecommerce/product/create-edit/product-availability';
import InventoryTracing from '@/components/Shared/ecommerce/product/create-edit/inventory-tracking';
import ProductPricing from '@/components/Shared/ecommerce/product/create-edit/product-pricing';

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="Pricing"
        description="Add your product pricing here"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      <FormGroup
        title="Inventory Tracking"
        description="Add your product inventory info here"
        className={cn(className)}
      >
        <InventoryTracing />
      </FormGroup>
      <FormGroup
        title="Availability"
        description="Add your product inventory info here"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup>
    </>
  );
}
