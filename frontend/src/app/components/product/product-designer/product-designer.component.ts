import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DesignService} from '../../../services/design/design.service';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product/product.service';
import { Design } from '../../../interfaces/design';

import { fabric } from "fabric";

@Component({
  selector: 'app-product-designer',
  templateUrl: './product-designer.component.html',
  styleUrls: ['./product-designer.component.scss'],
})
export class ProductDesignerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // Subject to unsubscribe from subscriptions
  private canvas: any; // FabricJS canvas instance
  private selectedObject: any; // Currently selected object on the canvas

  // Form group to handle design name, product name, and store selection for save functionality
  saveDesignForm: FormGroup = new FormGroup({
    designName: new FormControl(''),
    productName: new FormControl(''),
    selectedStore: new FormControl(''),
  });

  // Observables to store the list of designs, products, and selected product
  designs$: BehaviorSubject<Design[]> = new BehaviorSubject<Design[]>([]);
  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  selectedProduct$: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  productDesignerForm!: FormGroup;

  constructor(
    private designService: DesignService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Initialize FabricJS canvas on component initialization
    
    this.canvas = new fabric.Canvas('canvas');

    // Load designs and products
    this.loadDesigns();
    this.loadProducts();
  }

  initializeForms() {
      this.productDesignerForm = new FormGroup({
        sidebar: new FormGroup({
          images: new FormArray([]),  // Will contain uploaded image controls
          shapes: new FormArray([]),  // Will contain added shape controls
          text: new FormGroup({
            content: new FormControl(''),
            font: new FormControl(''),
            size: new FormControl(''),
            style: new FormControl(''),
          }),
          settings: new FormGroup({
            // More settings form controls here
          }),
          layers: new FormArray([]),  // Will contain layer controls
        }),
        header: new FormGroup({
          selectedProduct: new FormControl(''),
          undoRedoHistory: new FormArray([]),  // Contains history of actions
          save: new FormControl(''),
          preview: new FormControl(''),
          draft: new FormControl(''),
        }),
        saveDesignBox: new FormGroup({
          designName: new FormControl(''),
          productName: new FormControl(''),
          selectedStore: new FormControl(''),
        }),
      });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Load designs from the backend using DesignService
  loadDesigns() {
    this.designService
      .getAllDesigns()
      .pipe(takeUntil(this.destroy$))
      .subscribe((designs) => {
        this.designs$.next(designs);
      });
  }

  // Load products from the backend using ProductService
  loadProducts() {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products$.next(products);
      });
  }

  // Set the selected product
  setSelectedProduct(product: Product) {
    this.selectedProduct$.next(product);
  }

  // Initialize FabricJS canvas with a blank design
  initCanvas() {
    this.canvas.clear(); // Clear the canvas before initializing
    // Add any default elements, grid, or background if required
  }

  // Method to handle the "Save" action for the design
  onSaveDesign() {
    const designData: Design = {
      _id: '', // Set to a unique ID when saving on the backend
      name: this.saveDesignForm.get('designName')?.value || '',
      user_id: '', // Set to the current user's ID
      product_id: this.selectedProduct$?.value?._id || '',
      predefined_product_id: '', // Set if you have a predefined product ID
      images: [], // Store URLs or other references to images used in the design
      design_preview: [], // Store URLs of a preview image of the design
      design_file_urls: [], // Store URLs of the design file (e.g., JSON export of canvas objects)
      dimensions: {
        width: 0, // Set width of the design
        height: 0, // Set height of the design
        top: 0, // Set top position of the design on the canvas
        left: 0, // Set left position of the design on the canvas
      },
      deletedAt: null, // Set if the design is deleted (for soft delete functionality)
      isActive: true, // Set to true to activate the design
      version: 1, // Set the initial version number
    };

    // Call the DesignService to save the design
    this.designService.createOrUpdateDesign(designData).subscribe((savedDesign) => {
      // Handle the response (e.g., show success message, navigate to a different page)
    });
  }

  // Placeholder methods for adding text, shapes, and images to the canvas
  addText() {
    const text = new fabric.Text('Hello world', { left: 10, top: 10 });
    this.canvas.add(text);
    // Optional: Add a mechanism to adjust font, size, and other text properties.
}


  addShape() {
    // Implement logic to add shapes to the canvas
  }

  uploadImage() {
    // Implement logic to handle image upload and add the image to the canvas
  }

  // Placeholder methods for handling undo and redo functionality
  undo() {
    // Implement logic to undo the last action on the canvas
  }

  redo() {
    // Implement logic to redo the last undone action on the canvas
  }

  // Placeholder methods for advanced layer management
  bringToFront() {
    // Implement logic to bring the selected object to the front
  }

  sendToBack() {
    // Implement logic to send the selected object to the back
  }

  groupObjects() {
    // Implement logic to group selected objects
  }

  ungroupObjects() {
    // Implement logic to ungroup selected objects
  }

  lockObject() {
    // Implement logic to lock the selected object
  }

  hideObject() {
    // Implement logic to hide the selected object
  }

  // Other methods and functionalities can be added based on your requirements
}
