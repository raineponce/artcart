// ArtCart - Main JavaScript

// Category icon mapping (Google Material Symbols names)
const categoryIcons = {
  drawing: "draw",
  painting: "brush",
  surfaces: "grid_on",
  tools: "construction",
  chemicals: "science",
  accessories: "backpack",
};

// Default supply data (used to seed localStorage on first visit)
const defaultSupplies = [
  {
    name: "Colored Pencils",
    category: "drawing",
    quantity: 72,
    brand: "Prismacolor",
    origin: "Blick Art Materials",
    dimensions: "8 x 8.25 in",
    notes: "Premier soft core set. Great for blending and layering.",
    tags: ["dry", "drawing", "blendable", "colored"],
  },
  {
    name: "Graphite Pencils",
    category: "drawing",
    quantity: 12,
    brand: "Royal Langnickel",
    origin: "Amazon",
    dimensions: "5.5 x 10 in",
    notes: "Sketching set ranging from 6H to 8B.",
    tags: ["dry", "drawing", "sketching", "graphite"],
  },
  {
    name: "Vine Charcoal",
    category: "drawing",
    quantity: 36,
    brand: "Jack Richeson",
    origin: "Jerry's Artarama",
    dimensions: "2 x 7 in",
    notes: "Soft grade, good for gesture drawings and large studies.",
    tags: ["dry", "drawing", "sketching", "charcoal"],
  },
  {
    name: "Acrylic Paint",
    category: "painting",
    quantity: 4,
    brand: "Liquitex",
    origin: "Blick Art Materials",
    dimensions: "N/A",
    notes: "Heavy body basics set — titanium white, mars black, cad yellow, ultramarine blue.",
    tags: ["wet", "painting", "acrylic", "colored"],
  },
  {
    name: "Watercolor Set",
    category: "painting",
    quantity: 12,
    brand: "Winsor & Newton",
    origin: "Michaels",
    dimensions: "5.5 x 10 in",
    notes: "Cotman half-pan travel set with built-in mixing palette.",
    tags: ["wet", "painting", "watercolor", "portable"],
  },
  {
    name: "Face Paint",
    category: "painting",
    quantity: 12,
    brand: "TAG Face Paint",
    origin: "Amazon",
    dimensions: "10 x 5 in",
    notes: "Skin-safe, water-activated split cakes for events.",
    tags: ["wet", "painting", "skin-safe", "portable"],
  },
  {
    name: "Stretched Canvas",
    category: "surfaces",
    quantity: 6,
    brand: "Arteza",
    origin: "Arteza.com",
    dimensions: "16 x 20 in",
    notes: "Pre-primed cotton canvases, gallery-wrapped.",
    tags: ["surfaces", "canvas", "primed", "painting"],
  },
  {
    name: "Watercolor Paper Pad",
    category: "surfaces",
    quantity: 2,
    brand: "Canson",
    origin: "Blick Art Materials",
    dimensions: "9 x 12 in",
    notes: "140 lb cold press, 30 sheets per pad.",
    tags: ["surfaces", "paper", "watercolor", "portable"],
  },
  {
    name: "Palette Knives",
    category: "tools",
    quantity: 5,
    brand: "Conda",
    origin: "Amazon",
    dimensions: "Assorted",
    notes: "Stainless steel set for mixing and impasto technique.",
    tags: ["tools", "mixing", "painting", "metal"],
  },
  {
    name: "Craft Scissors",
    category: "tools",
    quantity: 3,
    brand: "Fiskars",
    origin: "Michaels",
    dimensions: "8 in",
    notes: "Precision-tip, great for detailed paper cutting.",
    tags: ["tools", "cutting", "paper", "metal"],
  },
  {
    name: "Gesso",
    category: "chemicals",
    quantity: 1,
    brand: "Liquitex",
    origin: "Blick Art Materials",
    dimensions: "16 oz",
    notes: "White acrylic gesso for priming surfaces before painting.",
    tags: ["wet", "chemicals", "primer", "painting"],
  },
  {
    name: "Brush Cleaner",
    category: "chemicals",
    quantity: 2,
    brand: "General Pencil",
    origin: "Jerry's Artarama",
    dimensions: "4 oz",
    notes: "The Masters brush cleaner and preserver.",
    tags: ["chemicals", "cleaning", "painting", "maintenance"],
  },
  {
    name: "Art Supply Bag",
    category: "accessories",
    quantity: 1,
    brand: "Nicpro",
    origin: "Amazon",
    dimensions: "14 x 10 x 4 in",
    notes: "Zippered organizer with compartments for pencils and brushes.",
    tags: ["accessories", "storage", "portable", "organization"],
  },
  {
    name: "Tabletop Easel",
    category: "accessories",
    quantity: 1,
    brand: "US Art Supply",
    origin: "Amazon",
    dimensions: "18 in",
    notes: "Portable beechwood easel, adjustable angle.",
    tags: ["accessories", "easel", "portable", "wood"],
  },
];

// Load supplies from localStorage, or seed with defaults on first visit
function loadSupplies() {
  const stored = localStorage.getItem("supplies");
  if (stored) {
    return JSON.parse(stored);
  }
  // First visit — seed localStorage with default data
  localStorage.setItem("supplies", JSON.stringify(defaultSupplies));
  return JSON.parse(JSON.stringify(defaultSupplies));
}

// Save the current supplies array to localStorage
function saveSupplies() {
  localStorage.setItem("supplies", JSON.stringify(supplies));
}

const supplies = loadSupplies();

// Category display order
const categoryOrder = [
  "drawing",
  "painting",
  "surfaces",
  "tools",
  "chemicals",
  "accessories",
];

// Group supplies by category
function groupByCategory(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  }
  return groups;
}

// Render all supply cards into the main container
function renderSupplies() {
  const main = document.getElementById("supplies-main");
  if (!main) return;

  const grouped = groupByCategory(supplies);

  // Only render categories that have items, in specified order
  for (const cat of categoryOrder) {
    const items = grouped[cat];
    if (!items || items.length === 0) continue;

    const section = document.createElement("section");
    section.className = "category-section";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = cat;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "card-grid";

    for (const item of items) {
      const card = document.createElement("div");
      card.className = "supply-card";
      card.innerHTML = `
        <div class="card-icon">
          <span class="material-symbols-rounded">${categoryIcons[item.category] || "category"}</span>
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-detail"><span>Quantity:</span> ${item.quantity}</p>
        <p class="card-detail"><span>Brand:</span> ${item.brand}</p>
        <p class="card-detail"><span>Origin:</span> ${item.origin}</p>
      `;
      card.addEventListener("click", () => openOverlay(item));
      grid.appendChild(card);
    }

    section.appendChild(grid);
    main.appendChild(section);
  }
}

// Track the currently viewed item for edit/delete
let currentItem = null;

// Overlay logic
function openOverlay(item) {
  currentItem = item;
  const overlay = document.getElementById("overlay");
  const iconEl = document.getElementById("overlay-icon");
  const titleEl = document.getElementById("overlay-title");
  const detailsEl = document.getElementById("overlay-details");

  iconEl.innerHTML = `<span class="material-symbols-rounded">${categoryIcons[item.category] || "category"}</span>`;
  titleEl.textContent = item.name;

  const fields = [
    { label: "Category", value: item.category },
    { label: "Quantity", value: item.quantity },
    { label: "Brand", value: item.brand },
    { label: "Origin", value: item.origin },
    { label: "Dimensions", value: item.dimensions },
    { label: "Notes", value: item.notes },
  ];

  detailsEl.innerHTML = fields
    .map(
      (f) => `
      <div class="overlay-detail-row">
        <span class="overlay-detail-label">${f.label}</span>
        <span class="overlay-detail-value">${f.value}</span>
      </div>
    `
    )
    .join("");

  overlay.classList.add("active");
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("active");
}

// ===== ADD TO WISHLIST (from supplies overlay) =====

function addCurrentItemToWishlist() {
  if (!currentItem) return;

  wishlist.push({
    name: currentItem.name,
    category: currentItem.category,
    quantity: currentItem.quantity || "",
    brand: currentItem.brand || "",
    store: currentItem.origin || "",
  });

  saveWishlist();
  closeOverlay();
}

// ===== FILTER LOGIC =====

// Collect all unique tags from supplies
function getAllTags() {
  const tagSet = new Set();
  for (const item of supplies) {
    for (const tag of item.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

// Track selected tags
let selectedTags = new Set();

// Build the filter overlay tag chips
function renderFilterTags() {
  const container = document.getElementById("filter-tags");
  if (!container) return;

  container.innerHTML = "";
  const allTags = getAllTags();

  for (const tag of allTags) {
    const chip = document.createElement("button");
    chip.className = "filter-chip" + (selectedTags.has(tag) ? " active" : "");
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        chip.classList.remove("active");
      } else {
        selectedTags.add(tag);
        chip.classList.add("active");
      }
    });
    container.appendChild(chip);
  }
}

function openFilterOverlay() {
  renderFilterTags();
  document.getElementById("filter-overlay").classList.add("active");
}

function closeFilterOverlay() {
  document.getElementById("filter-overlay").classList.remove("active");
}

// Apply the selected tags and show results
function applyFilter() {
  closeFilterOverlay();
  const main = document.getElementById("supplies-main");
  if (!main) return;

  // If no tags selected, restore default view
  if (selectedTags.size === 0) {
    main.innerHTML = "";
    renderSupplies();
    return;
  }

  // Filter items that match ALL selected tags
  const filtered = supplies.filter((item) =>
    [...selectedTags].every((tag) => item.tags.includes(tag))
  );

  main.innerHTML = "";

  const section = document.createElement("section");
  section.className = "category-section";

  const title = document.createElement("h2");
  title.className = "category-title";
  title.textContent = "results";
  section.appendChild(title);

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "filter-empty";
    empty.textContent = "No supplies match the selected tags.";
    section.appendChild(empty);
  } else {
    const grid = document.createElement("div");
    grid.className = "card-grid";

    for (const item of filtered) {
      const card = document.createElement("div");
      card.className = "supply-card";
      card.innerHTML = `
        <div class="card-icon">
          <span class="material-symbols-rounded">${categoryIcons[item.category] || "category"}</span>
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-detail"><span>Quantity:</span> ${item.quantity}</p>
        <p class="card-detail"><span>Brand:</span> ${item.brand}</p>
        <p class="card-detail"><span>Origin:</span> ${item.origin}</p>
      `;
      card.addEventListener("click", () => openOverlay(item));
      grid.appendChild(card);
    }

    section.appendChild(grid);
  }

  main.appendChild(section);
}

// Clear all selected tags and restore default view
function clearFilter() {
  selectedTags.clear();
  closeFilterOverlay();
  const main = document.getElementById("supplies-main");
  if (!main) return;
  main.innerHTML = "";
  renderSupplies();
}

// ===== NEW ITEM LOGIC =====

let newItemTags = new Set();

function renderNewFormTags() {
  const container = document.getElementById("new-form-tags");
  if (!container) return;

  container.innerHTML = "";
  const allTags = getAllTags();

  for (const tag of allTags) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip" + (newItemTags.has(tag) ? " active" : "");
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      if (newItemTags.has(tag)) {
        newItemTags.delete(tag);
        chip.classList.remove("active");
      } else {
        newItemTags.add(tag);
        chip.classList.add("active");
      }
    });
    container.appendChild(chip);
  }
}

function openNewOverlay() {
  newItemTags.clear();
  document.getElementById("new-form")?.reset();
  renderNewFormTags();
  document.getElementById("new-overlay").classList.add("active");
}

function closeNewOverlay() {
  document.getElementById("new-overlay").classList.remove("active");
}

function handleNewFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("new-name").value.trim();
  const category = document.getElementById("new-category").value;

  if (!name || !category) return;

  const newItem = {
    name,
    category,
    quantity: document.getElementById("new-quantity").value
      ? Number(document.getElementById("new-quantity").value)
      : "",
    brand: document.getElementById("new-brand").value.trim() || "",
    origin: document.getElementById("new-origin").value.trim() || "",
    dimensions: document.getElementById("new-dimensions").value.trim() || "",
    notes: document.getElementById("new-notes").value.trim() || "",
    tags: Array.from(newItemTags),
  };

  supplies.push(newItem);
  saveSupplies();
  closeNewOverlay();

  // Re-render the page
  const main = document.getElementById("supplies-main");
  if (!main) return;
  main.innerHTML = "";

  // If a filter was active, re-apply it; otherwise show default view
  if (selectedTags.size > 0) {
    applyFilter();
  } else {
    renderSupplies();
  }
}

// ===== EDIT ITEM LOGIC =====

let editItemTags = new Set();

function renderEditFormTags() {
  const container = document.getElementById("edit-form-tags");
  if (!container) return;

  container.innerHTML = "";
  const allTags = getAllTags();

  for (const tag of allTags) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip" + (editItemTags.has(tag) ? " active" : "");
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      if (editItemTags.has(tag)) {
        editItemTags.delete(tag);
        chip.classList.remove("active");
      } else {
        editItemTags.add(tag);
        chip.classList.add("active");
      }
    });
    container.appendChild(chip);
  }
}

function openEditOverlay() {
  if (!currentItem) return;
  closeOverlay();

  // Populate form with current item data
  document.getElementById("edit-name").value = currentItem.name;
  document.getElementById("edit-category").value = currentItem.category;
  document.getElementById("edit-quantity").value = currentItem.quantity || "";
  document.getElementById("edit-brand").value = currentItem.brand || "";
  document.getElementById("edit-origin").value = currentItem.origin || "";
  document.getElementById("edit-dimensions").value = currentItem.dimensions || "";
  document.getElementById("edit-notes").value = currentItem.notes || "";

  editItemTags = new Set(currentItem.tags || []);
  renderEditFormTags();

  document.getElementById("edit-overlay").classList.add("active");
}

function closeEditOverlay() {
  document.getElementById("edit-overlay").classList.remove("active");
}

function handleEditFormSubmit(e) {
  e.preventDefault();
  if (!currentItem) return;

  const name = document.getElementById("edit-name").value.trim();
  const category = document.getElementById("edit-category").value;

  if (!name || !category) return;

  // Update the item in place
  currentItem.name = name;
  currentItem.category = category;
  currentItem.quantity = document.getElementById("edit-quantity").value
    ? Number(document.getElementById("edit-quantity").value)
    : "";
  currentItem.brand = document.getElementById("edit-brand").value.trim() || "";
  currentItem.origin = document.getElementById("edit-origin").value.trim() || "";
  currentItem.dimensions = document.getElementById("edit-dimensions").value.trim() || "";
  currentItem.notes = document.getElementById("edit-notes").value.trim() || "";
  currentItem.tags = Array.from(editItemTags);

  saveSupplies();
  closeEditOverlay();
  refreshMain();
}

// ===== DELETE ITEM LOGIC =====

function openDeleteOverlay() {
  if (!currentItem) return;
  closeOverlay();

  document.getElementById("delete-item-name").textContent = currentItem.name;
  document.getElementById("delete-overlay").classList.add("active");
}

function closeDeleteOverlay() {
  document.getElementById("delete-overlay").classList.remove("active");
}

function confirmDelete() {
  if (!currentItem) return;

  const index = supplies.indexOf(currentItem);
  if (index !== -1) {
    supplies.splice(index, 1);
  }

  saveSupplies();
  currentItem = null;
  closeDeleteOverlay();
  refreshMain();
}

// Re-render main content respecting active filter
function refreshMain() {
  const main = document.getElementById("supplies-main");
  if (!main) return;
  main.innerHTML = "";

  if (selectedTags.size > 0) {
    applyFilter();
  } else {
    renderSupplies();
  }
}

// ===== WISHLIST LOGIC =====

const defaultWishlist = [
  {
    name: "Colored Pencils",
    category: "drawing",
    quantity: 72,
    brand: "Prismacolor",
    store: "Sam Flax",
  },
  {
    name: "Tombow Erasers",
    category: "drawing",
    quantity: 8,
    brand: "Tombow",
    store: "Amazon",
  },
  {
    name: "Gel Pens",
    category: "drawing",
    quantity: 2,
    brand: "Gelly Roll",
    store: "Sam Flax",
  },
];

function loadWishlist() {
  const stored = localStorage.getItem("wishlist");
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem("wishlist", JSON.stringify(defaultWishlist));
  return JSON.parse(JSON.stringify(defaultWishlist));
}

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

const wishlist = loadWishlist();
let currentWishlistItem = null;
const checkedItems = new Set();

function updateMoveButtons() {
  const topBtn = document.getElementById("move-to-supplies-top-btn");
  const bottomBtn = document.getElementById("move-to-supplies-bottom-btn");
  const disabled = checkedItems.size === 0;
  if (topBtn) topBtn.disabled = disabled;
  if (bottomBtn) bottomBtn.disabled = disabled;
}

function renderWishlist() {
  const main = document.getElementById("wishlist-main");
  if (!main) return;

  main.innerHTML = "";

  if (wishlist.length === 0) {
    const empty = document.createElement("p");
    empty.className = "wishlist-empty";
    empty.textContent = 'Your shopping list is empty. Click "new" to add items!';
    main.appendChild(empty);

    // Hide bottom action when empty
    const bottomAction = document.getElementById("wishlist-bottom-action");
    if (bottomAction) bottomAction.style.display = "none";
    return;
  }

  // Show bottom action
  const bottomAction = document.getElementById("wishlist-bottom-action");
  if (bottomAction) bottomAction.style.display = "";

  // Cart icon
  const cartIcon = document.createElement("div");
  cartIcon.className = "wishlist-cart-icon";
  cartIcon.innerHTML = '<span class="material-symbols-rounded">shopping_cart</span>';
  main.appendChild(cartIcon);

  // List container
  const list = document.createElement("div");
  list.className = "wishlist-list";

  for (let i = 0; i < wishlist.length; i++) {
    const item = wishlist[i];
    const row = document.createElement("div");
    row.className = "wishlist-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "wishlist-checkbox";
    checkbox.checked = checkedItems.has(i);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkedItems.add(i);
      } else {
        checkedItems.delete(i);
      }
      updateMoveButtons();
    });

    const name = document.createElement("span");
    name.className = "wishlist-item-name";
    name.textContent = item.name;

    const desc = document.createElement("span");
    desc.className = "wishlist-item-desc";
    desc.innerHTML =
      `<span>Quantity:</span> ${item.quantity || "—"}<br>` +
      `<span>Brand:</span> ${item.brand || "—"}<br>` +
      `<span>Store:</span> ${item.store || "—"}`;

    const actions = document.createElement("div");
    actions.className = "wishlist-item-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn-wishlist-action";
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", () => openWishlistEditOverlay(i));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-wishlist-action delete";
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", () => openWishlistDeleteOverlay(i));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(checkbox);
    row.appendChild(name);
    row.appendChild(desc);
    row.appendChild(actions);
    list.appendChild(row);
  }

  main.appendChild(list);
  updateMoveButtons();
}

// New wishlist item
function openWishlistNewOverlay() {
  document.getElementById("wishlist-new-form")?.reset();
  document.getElementById("wishlist-new-overlay").classList.add("active");
}

function closeWishlistNewOverlay() {
  document.getElementById("wishlist-new-overlay").classList.remove("active");
}

function handleWishlistNewSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("wishlist-new-name").value.trim();
  const category = document.getElementById("wishlist-new-category").value;

  if (!name || !category) return;

  wishlist.push({
    name,
    category,
    quantity: document.getElementById("wishlist-new-quantity").value
      ? Number(document.getElementById("wishlist-new-quantity").value)
      : "",
    brand: document.getElementById("wishlist-new-brand").value.trim() || "",
    store: document.getElementById("wishlist-new-store").value.trim() || "",
  });

  saveWishlist();
  closeWishlistNewOverlay();
  checkedItems.clear();
  renderWishlist();
}

// Edit wishlist item
function openWishlistEditOverlay(index) {
  currentWishlistItem = index;
  const item = wishlist[index];

  document.getElementById("wishlist-edit-name").value = item.name;
  document.getElementById("wishlist-edit-category").value = item.category;
  document.getElementById("wishlist-edit-quantity").value = item.quantity || "";
  document.getElementById("wishlist-edit-brand").value = item.brand || "";
  document.getElementById("wishlist-edit-store").value = item.store || "";

  document.getElementById("wishlist-edit-overlay").classList.add("active");
}

function closeWishlistEditOverlay() {
  document.getElementById("wishlist-edit-overlay").classList.remove("active");
}

function handleWishlistEditSubmit(e) {
  e.preventDefault();
  if (currentWishlistItem === null) return;

  const name = document.getElementById("wishlist-edit-name").value.trim();
  const category = document.getElementById("wishlist-edit-category").value;

  if (!name || !category) return;

  wishlist[currentWishlistItem] = {
    name,
    category,
    quantity: document.getElementById("wishlist-edit-quantity").value
      ? Number(document.getElementById("wishlist-edit-quantity").value)
      : "",
    brand: document.getElementById("wishlist-edit-brand").value.trim() || "",
    store: document.getElementById("wishlist-edit-store").value.trim() || "",
  };

  saveWishlist();
  closeWishlistEditOverlay();
  renderWishlist();
}

// Delete wishlist item
function openWishlistDeleteOverlay(index) {
  currentWishlistItem = index;
  document.getElementById("wishlist-delete-item-name").textContent =
    wishlist[index].name;
  document.getElementById("wishlist-delete-overlay").classList.add("active");
}

function closeWishlistDeleteOverlay() {
  document.getElementById("wishlist-delete-overlay").classList.remove("active");
}

function confirmWishlistDelete() {
  if (currentWishlistItem === null) return;

  wishlist.splice(currentWishlistItem, 1);
  saveWishlist();
  currentWishlistItem = null;
  closeWishlistDeleteOverlay();
  checkedItems.clear();
  renderWishlist();
}

// Move checked items to supplies
function openMoveOverlay() {
  if (checkedItems.size === 0) return;
  document.getElementById("move-overlay").classList.add("active");
}

function closeMoveOverlay() {
  document.getElementById("move-overlay").classList.remove("active");
}

function confirmMoveToSupplies() {
  // Get checked indices in descending order so splicing doesn't shift indices
  const indices = Array.from(checkedItems).sort((a, b) => b - a);

  for (const i of indices) {
    const item = wishlist[i];
    // Convert wishlist item to supply item
    supplies.push({
      name: item.name,
      category: item.category,
      quantity: item.quantity || "",
      brand: item.brand || "",
      origin: item.store || "",
      dimensions: "",
      notes: "",
      tags: [],
    });
    wishlist.splice(i, 1);
  }

  saveSupplies();
  saveWishlist();
  checkedItems.clear();
  closeMoveOverlay();
  renderWishlist();
}

// ===== GALLERY LOGIC =====

function loadGallery() {
  const stored = localStorage.getItem("gallery");
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem("gallery", JSON.stringify([]));
  return [];
}

function saveGallery() {
  localStorage.setItem("gallery", JSON.stringify(gallery));
}

const gallery = loadGallery();
let currentGalleryItem = null;
let pendingImageData = null;

function renderGallery() {
  const main = document.getElementById("gallery-main");
  if (!main) return;

  main.innerHTML = "";

  if (gallery.length === 0) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = 'Your gallery is empty. Click "new" to add images!';
    main.appendChild(empty);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  for (let i = 0; i < gallery.length; i++) {
    const item = gallery[i];
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.innerHTML = `
      <img class="gallery-card-img" src="${item.image}" alt="${item.title}">
      <h3 class="gallery-card-title">${item.title}</h3>
    `;
    card.addEventListener("click", () => openGalleryViewOverlay(i));
    grid.appendChild(card);
  }

  main.appendChild(grid);
}

// New image overlay
function openGalleryNewOverlay() {
  pendingImageData = null;
  document.getElementById("gallery-new-form")?.reset();
  document.getElementById("gallery-upload-area").style.display = "";
  document.getElementById("gallery-upload-preview").style.display = "none";
  document.getElementById("gallery-new-overlay").classList.add("active");
}

function closeGalleryNewOverlay() {
  document.getElementById("gallery-new-overlay").classList.remove("active");
}

function handleGalleryFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (ev) {
    pendingImageData = ev.target.result;
    document.getElementById("gallery-preview-img").src = pendingImageData;
    document.getElementById("gallery-upload-area").style.display = "none";
    document.getElementById("gallery-upload-preview").style.display = "";
  };
  reader.readAsDataURL(file);
}

function removeGalleryPreview() {
  pendingImageData = null;
  document.getElementById("gallery-new-file").value = "";
  document.getElementById("gallery-upload-area").style.display = "";
  document.getElementById("gallery-upload-preview").style.display = "none";
}

function handleGalleryNewSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("gallery-new-title").value.trim();
  if (!title || !pendingImageData) return;

  gallery.push({
    title,
    caption: document.getElementById("gallery-new-caption").value.trim() || "",
    image: pendingImageData,
  });

  saveGallery();
  closeGalleryNewOverlay();
  renderGallery();
}

// View image overlay
function openGalleryViewOverlay(index) {
  currentGalleryItem = index;
  const item = gallery[index];

  document.getElementById("gallery-view-img").src = item.image;
  document.getElementById("gallery-view-img").alt = item.title;
  document.getElementById("gallery-view-title").textContent = item.title;
  document.getElementById("gallery-view-caption").textContent = item.caption || "";
  document.getElementById("gallery-view-overlay").classList.add("active");
}

function closeGalleryViewOverlay() {
  document.getElementById("gallery-view-overlay").classList.remove("active");
}

// Edit image overlay
function openGalleryEditOverlay() {
  if (currentGalleryItem === null) return;
  closeGalleryViewOverlay();

  const item = gallery[currentGalleryItem];
  document.getElementById("gallery-edit-title").value = item.title;
  document.getElementById("gallery-edit-caption").value = item.caption || "";
  document.getElementById("gallery-edit-overlay").classList.add("active");
}

function closeGalleryEditOverlay() {
  document.getElementById("gallery-edit-overlay").classList.remove("active");
}

function handleGalleryEditSubmit(e) {
  e.preventDefault();
  if (currentGalleryItem === null) return;

  const title = document.getElementById("gallery-edit-title").value.trim();
  if (!title) return;

  gallery[currentGalleryItem].title = title;
  gallery[currentGalleryItem].caption = document.getElementById("gallery-edit-caption").value.trim() || "";

  saveGallery();
  closeGalleryEditOverlay();
  renderGallery();
}

// Delete image
function openGalleryDeleteOverlay() {
  if (currentGalleryItem === null) return;
  closeGalleryViewOverlay();

  document.getElementById("gallery-delete-item-name").textContent = gallery[currentGalleryItem].title;
  document.getElementById("gallery-delete-overlay").classList.add("active");
}

function closeGalleryDeleteOverlay() {
  document.getElementById("gallery-delete-overlay").classList.remove("active");
}

function confirmGalleryDelete() {
  if (currentGalleryItem === null) return;

  gallery.splice(currentGalleryItem, 1);
  saveGallery();
  currentGalleryItem = null;
  closeGalleryDeleteOverlay();
  renderGallery();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderSupplies();
  renderWishlist();
  renderGallery();

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // User dropdown toggle
  const userMenuBtn = document.getElementById("user-menu-btn");
  const userDropdown = document.getElementById("user-dropdown");
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      userDropdown.classList.remove("open");
    });
  }

  // Card overlay
  document
    .getElementById("overlay-close")
    ?.addEventListener("click", closeOverlay);

  document.getElementById("overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      closeOverlay();
    }
  });

  // Add to wishlist from overlay
  document
    .getElementById("overlay-wishlist-btn")
    ?.addEventListener("click", addCurrentItemToWishlist);

  // Edit overlay
  document
    .getElementById("overlay-edit-btn")
    ?.addEventListener("click", openEditOverlay);

  document
    .getElementById("edit-overlay-close")
    ?.addEventListener("click", closeEditOverlay);

  document.getElementById("edit-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "edit-overlay") {
      closeEditOverlay();
    }
  });

  document
    .getElementById("edit-cancel-btn")
    ?.addEventListener("click", closeEditOverlay);

  document
    .getElementById("edit-form")
    ?.addEventListener("submit", handleEditFormSubmit);

  // Delete overlay
  document
    .getElementById("overlay-delete-btn")
    ?.addEventListener("click", openDeleteOverlay);

  document
    .getElementById("delete-overlay-close")
    ?.addEventListener("click", closeDeleteOverlay);

  document.getElementById("delete-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "delete-overlay") {
      closeDeleteOverlay();
    }
  });

  document
    .getElementById("delete-cancel-btn")
    ?.addEventListener("click", closeDeleteOverlay);

  document
    .getElementById("delete-confirm-btn")
    ?.addEventListener("click", confirmDelete);

  // Filter overlay
  document
    .getElementById("filter-btn")
    ?.addEventListener("click", openFilterOverlay);

  document
    .getElementById("filter-overlay-close")
    ?.addEventListener("click", closeFilterOverlay);

  document.getElementById("filter-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "filter-overlay") {
      closeFilterOverlay();
    }
  });

  document
    .getElementById("filter-apply-btn")
    ?.addEventListener("click", applyFilter);

  document
    .getElementById("filter-clear-btn")
    ?.addEventListener("click", clearFilter);

  // New item overlay
  document
    .getElementById("new-btn")
    ?.addEventListener("click", openNewOverlay);

  document
    .getElementById("new-overlay-close")
    ?.addEventListener("click", closeNewOverlay);

  document.getElementById("new-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "new-overlay") {
      closeNewOverlay();
    }
  });

  document
    .getElementById("new-cancel-btn")
    ?.addEventListener("click", closeNewOverlay);

  document
    .getElementById("new-form")
    ?.addEventListener("submit", handleNewFormSubmit);

  // ===== WISHLIST EVENT LISTENERS =====

  // New wishlist item
  document
    .getElementById("wishlist-new-btn")
    ?.addEventListener("click", openWishlistNewOverlay);

  document
    .getElementById("wishlist-new-overlay-close")
    ?.addEventListener("click", closeWishlistNewOverlay);

  document.getElementById("wishlist-new-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "wishlist-new-overlay") closeWishlistNewOverlay();
  });

  document
    .getElementById("wishlist-new-cancel-btn")
    ?.addEventListener("click", closeWishlistNewOverlay);

  document
    .getElementById("wishlist-new-form")
    ?.addEventListener("submit", handleWishlistNewSubmit);

  // Edit wishlist item
  document
    .getElementById("wishlist-edit-overlay-close")
    ?.addEventListener("click", closeWishlistEditOverlay);

  document.getElementById("wishlist-edit-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "wishlist-edit-overlay") closeWishlistEditOverlay();
  });

  document
    .getElementById("wishlist-edit-cancel-btn")
    ?.addEventListener("click", closeWishlistEditOverlay);

  document
    .getElementById("wishlist-edit-form")
    ?.addEventListener("submit", handleWishlistEditSubmit);

  // Delete wishlist item
  document
    .getElementById("wishlist-delete-overlay-close")
    ?.addEventListener("click", closeWishlistDeleteOverlay);

  document.getElementById("wishlist-delete-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "wishlist-delete-overlay") closeWishlistDeleteOverlay();
  });

  document
    .getElementById("wishlist-delete-cancel-btn")
    ?.addEventListener("click", closeWishlistDeleteOverlay);

  document
    .getElementById("wishlist-delete-confirm-btn")
    ?.addEventListener("click", confirmWishlistDelete);

  // Move to supplies
  document
    .getElementById("move-to-supplies-top-btn")
    ?.addEventListener("click", openMoveOverlay);

  document
    .getElementById("move-to-supplies-bottom-btn")
    ?.addEventListener("click", openMoveOverlay);

  document
    .getElementById("move-overlay-close")
    ?.addEventListener("click", closeMoveOverlay);

  document.getElementById("move-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "move-overlay") closeMoveOverlay();
  });

  document
    .getElementById("move-cancel-btn")
    ?.addEventListener("click", closeMoveOverlay);

  document
    .getElementById("move-confirm-btn")
    ?.addEventListener("click", confirmMoveToSupplies);

  // ===== GALLERY EVENT LISTENERS =====

  // New image
  document
    .getElementById("gallery-new-btn")
    ?.addEventListener("click", openGalleryNewOverlay);

  document
    .getElementById("gallery-new-overlay-close")
    ?.addEventListener("click", closeGalleryNewOverlay);

  document.getElementById("gallery-new-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "gallery-new-overlay") closeGalleryNewOverlay();
  });

  document
    .getElementById("gallery-new-cancel-btn")
    ?.addEventListener("click", closeGalleryNewOverlay);

  document
    .getElementById("gallery-new-form")
    ?.addEventListener("submit", handleGalleryNewSubmit);

  // File upload
  document.getElementById("gallery-upload-area")?.addEventListener("click", () => {
    document.getElementById("gallery-new-file")?.click();
  });

  document
    .getElementById("gallery-new-file")
    ?.addEventListener("change", handleGalleryFileSelect);

  document
    .getElementById("gallery-remove-img")
    ?.addEventListener("click", removeGalleryPreview);

  // View image
  document
    .getElementById("gallery-view-overlay-close")
    ?.addEventListener("click", closeGalleryViewOverlay);

  document.getElementById("gallery-view-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "gallery-view-overlay") closeGalleryViewOverlay();
  });

  // Edit image
  document
    .getElementById("gallery-edit-btn")
    ?.addEventListener("click", openGalleryEditOverlay);

  document
    .getElementById("gallery-edit-overlay-close")
    ?.addEventListener("click", closeGalleryEditOverlay);

  document.getElementById("gallery-edit-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "gallery-edit-overlay") closeGalleryEditOverlay();
  });

  document
    .getElementById("gallery-edit-cancel-btn")
    ?.addEventListener("click", closeGalleryEditOverlay);

  document
    .getElementById("gallery-edit-form")
    ?.addEventListener("submit", handleGalleryEditSubmit);

  // Delete image
  document
    .getElementById("gallery-delete-btn")
    ?.addEventListener("click", openGalleryDeleteOverlay);

  document
    .getElementById("gallery-delete-overlay-close")
    ?.addEventListener("click", closeGalleryDeleteOverlay);

  document.getElementById("gallery-delete-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "gallery-delete-overlay") closeGalleryDeleteOverlay();
  });

  document
    .getElementById("gallery-delete-cancel-btn")
    ?.addEventListener("click", closeGalleryDeleteOverlay);

  document
    .getElementById("gallery-delete-confirm-btn")
    ?.addEventListener("click", confirmGalleryDelete);
});
