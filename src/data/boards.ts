export interface BoardCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  boards: Board[];
}

export interface Board {
  id: string;
  title: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  colors: number;
}

export const boardCategories: BoardCategory[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    description: 'Cute and majestic creatures from around the world',
    boards: [
      { id: 'cat-1', title: 'Fluffy Orange Cat', imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'dog-1', title: 'Golden Retriever', imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'bird-1', title: 'Colorful Parrot', imageUrl: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 16 },
      { id: 'horse-1', title: 'Wild Stallion', imageUrl: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 10 },
      { id: 'elephant-1', title: 'Majestic Elephant', imageUrl: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 14 },
      { id: 'lion-1', title: 'Lion Portrait', imageUrl: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'butterfly-1', title: 'Monarch Butterfly', imageUrl: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 11 },
      { id: 'owl-1', title: 'Wise Owl', imageUrl: 'https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 9 },
      { id: 'deer-1', title: 'Forest Deer', imageUrl: 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'tiger-1', title: 'Bengal Tiger', imageUrl: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'panda-1', title: 'Giant Panda', imageUrl: 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 6 },
      { id: 'fox-1', title: 'Red Fox', imageUrl: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'wolf-1', title: 'Gray Wolf', imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 13 },
      { id: 'rabbit-1', title: 'Cute Bunny', imageUrl: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 7 },
      { id: 'bear-1', title: 'Brown Bear', imageUrl: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 16 },
      { id: 'penguin-1', title: 'Emperor Penguin', imageUrl: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 5 },
      { id: 'dolphin-1', title: 'Playful Dolphin', imageUrl: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 8 },
      { id: 'giraffe-1', title: 'Tall Giraffe', imageUrl: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 11 },
      { id: 'zebra-1', title: 'Striped Zebra', imageUrl: 'https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 9 },
      { id: 'koala-1', title: 'Sleepy Koala', imageUrl: 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 8 }
    ]
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    description: 'Beautiful landscapes and natural scenes',
    boards: [
      { id: 'sunset-1', title: 'Mountain Sunset', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'forest-1', title: 'Enchanted Forest', imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 15 },
      { id: 'ocean-1', title: 'Ocean Waves', imageUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 10 },
      { id: 'waterfall-1', title: 'Tropical Waterfall', imageUrl: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 14 },
      { id: 'desert-1', title: 'Desert Dunes', imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 8 },
      { id: 'lake-1', title: 'Serene Lake', imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 9 },
      { id: 'canyon-1', title: 'Grand Canyon', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 16 },
      { id: 'meadow-1', title: 'Spring Meadow', imageUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'volcano-1', title: 'Active Volcano', imageUrl: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'glacier-1', title: 'Arctic Glacier', imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 10 },
      { id: 'rainforest-1', title: 'Amazon Rainforest', imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 17 },
      { id: 'aurora-1', title: 'Northern Lights', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 20 },
      { id: 'cave-1', title: 'Crystal Cave', imageUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 12 },
      { id: 'beach-1', title: 'Tropical Beach', imageUrl: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'mountain-1', title: 'Snow-Capped Peak', imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 11 },
      { id: 'river-1', title: 'Winding River', imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'cliff-1', title: 'Coastal Cliffs', imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 14 },
      { id: 'valley-1', title: 'Green Valley', imageUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 9 },
      { id: 'island-1', title: 'Paradise Island', imageUrl: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'prairie-1', title: 'Golden Prairie', imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 7 }
    ]
  },
  {
    id: 'flowers',
    name: 'Flowers',
    icon: '🌸',
    description: 'Beautiful blooms and floral arrangements',
    boards: [
      { id: 'rose-1', title: 'Red Rose', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 6 },
      { id: 'sunflower-1', title: 'Bright Sunflower', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'tulip-1', title: 'Spring Tulips', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'orchid-1', title: 'Exotic Orchid', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '55 min', colors: 14 },
      { id: 'lily-1', title: 'Water Lily', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'daisy-1', title: 'Field Daisies', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 7 },
      { id: 'cherry-1', title: 'Cherry Blossoms', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'lavender-1', title: 'Lavender Field', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 9 },
      { id: 'peony-1', title: 'Pink Peony', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'iris-1', title: 'Purple Iris', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '35 min', colors: 8 },
      { id: 'hibiscus-1', title: 'Tropical Hibiscus', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 9 },
      { id: 'poppy-1', title: 'Red Poppy', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 6 },
      { id: 'magnolia-1', title: 'White Magnolia', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'carnation-1', title: 'Pink Carnation', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 7 },
      { id: 'jasmine-1', title: 'Jasmine Flowers', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'gardenia-1', title: 'White Gardenia', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '35 min', colors: 8 },
      { id: 'azalea-1', title: 'Azalea Blooms', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'camellia-1', title: 'Red Camellia', imageUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 9 },
      { id: 'daffodil-1', title: 'Yellow Daffodil', imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 6 },
      { id: 'bouquet-1', title: 'Mixed Bouquet', imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 16 }
    ]
  },
  {
    id: 'architecture',
    name: 'Architecture',
    icon: '🏛️',
    description: 'Stunning buildings and architectural marvels',
    boards: [
      { id: 'castle-1', title: 'Medieval Castle', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'cathedral-1', title: 'Gothic Cathedral', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 20 },
      { id: 'bridge-1', title: 'Golden Gate Bridge', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'lighthouse-1', title: 'Coastal Lighthouse', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'temple-1', title: 'Ancient Temple', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 16 },
      { id: 'mansion-1', title: 'Victorian Mansion', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'pagoda-1', title: 'Japanese Pagoda', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 13 },
      { id: 'windmill-1', title: 'Dutch Windmill', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 9 },
      { id: 'skyscraper-1', title: 'Modern Skyscraper', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 14 },
      { id: 'cottage-1', title: 'Country Cottage', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 8 },
      { id: 'palace-1', title: 'Royal Palace', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '85 min', colors: 22 },
      { id: 'church-1', title: 'Country Church', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'barn-1', title: 'Red Barn', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 7 },
      { id: 'tower-1', title: 'Clock Tower', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'dome-1', title: 'Capitol Dome', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'fortress-1', title: 'Stone Fortress', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 17 },
      { id: 'villa-1', title: 'Mediterranean Villa', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 13 },
      { id: 'abbey-1', title: 'Ancient Abbey', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'pavilion-1', title: 'Garden Pavilion', imageUrl: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'observatory-1', title: 'Space Observatory', imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 }
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: '🚗',
    description: 'Classic cars, planes, and transportation',
    boards: [
      { id: 'car-1', title: 'Classic Sports Car', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'motorcycle-1', title: 'Vintage Motorcycle', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'plane-1', title: 'Fighter Jet', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 14 },
      { id: 'train-1', title: 'Steam Locomotive', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 16 },
      { id: 'boat-1', title: 'Sailing Yacht', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 13 },
      { id: 'truck-1', title: 'Fire Truck', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'helicopter-1', title: 'Rescue Helicopter', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 17 },
      { id: 'bus-1', title: 'Double Decker Bus', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 9 },
      { id: 'submarine-1', title: 'Yellow Submarine', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'bicycle-1', title: 'Vintage Bicycle', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'rocket-1', title: 'Space Rocket', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'tractor-1', title: 'Farm Tractor', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'ambulance-1', title: 'Emergency Ambulance', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 9 },
      { id: 'tank-1', title: 'Military Tank', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'scooter-1', title: 'Vespa Scooter', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 7 },
      { id: 'van-1', title: 'Camping Van', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'cart-1', title: 'Horse Cart', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'gondola-1', title: 'Venice Gondola', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'trolley-1', title: 'San Francisco Trolley', imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'carriage-1', title: 'Royal Carriage', imageUrl: 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 14 }
    ]
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍎',
    description: 'Delicious dishes and fresh ingredients',
    boards: [
      { id: 'fruit-1', title: 'Fresh Fruit Bowl', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'pizza-1', title: 'Italian Pizza', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'cake-1', title: 'Birthday Cake', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 14 },
      { id: 'burger-1', title: 'Gourmet Burger', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'sushi-1', title: 'Sushi Platter', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 16 },
      { id: 'salad-1', title: 'Garden Salad', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 7 },
      { id: 'pasta-1', title: 'Spaghetti Bolognese', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'ice-cream-1', title: 'Ice Cream Sundae', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 9 },
      { id: 'bread-1', title: 'Fresh Bread Loaf', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 6 },
      { id: 'coffee-1', title: 'Coffee and Pastry', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'soup-1', title: 'Vegetable Soup', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 8 },
      { id: 'steak-1', title: 'Grilled Steak', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'tacos-1', title: 'Mexican Tacos', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 12 },
      { id: 'pancakes-1', title: 'Stack of Pancakes', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 7 },
      { id: 'wine-1', title: 'Wine and Cheese', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 13 },
      { id: 'donut-1', title: 'Glazed Donuts', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 6 },
      { id: 'seafood-1', title: 'Seafood Platter', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'smoothie-1', title: 'Fruit Smoothie', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '20 min', colors: 5 },
      { id: 'bbq-1', title: 'BBQ Ribs', imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'cookies-1', title: 'Chocolate Chip Cookies', imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 }
    ]
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    icon: '🐉',
    description: 'Magical creatures and enchanted worlds',
    boards: [
      { id: 'dragon-1', title: 'Fire Dragon', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 20 },
      { id: 'unicorn-1', title: 'Magical Unicorn', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 14 },
      { id: 'fairy-1', title: 'Garden Fairy', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'wizard-1', title: 'Wise Wizard', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 18 },
      { id: 'phoenix-1', title: 'Rising Phoenix', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 19 },
      { id: 'mermaid-1', title: 'Ocean Mermaid', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '60 min', colors: 15 },
      { id: 'griffin-1', title: 'Majestic Griffin', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 16 },
      { id: 'pegasus-1', title: 'Flying Pegasus', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 13 },
      { id: 'centaur-1', title: 'Forest Centaur', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 17 },
      { id: 'elf-1', title: 'Woodland Elf', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'castle-fantasy-1', title: 'Enchanted Castle', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '85 min', colors: 22 },
      { id: 'crystal-1', title: 'Magic Crystals', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'potion-1', title: 'Magic Potions', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'wand-1', title: 'Magic Wand', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'mushroom-1', title: 'Fairy Mushrooms', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 9 },
      { id: 'tree-magic-1', title: 'Enchanted Tree', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 13 },
      { id: 'portal-1', title: 'Magic Portal', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 15 },
      { id: 'spell-1', title: 'Casting Spell', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'crown-1', title: 'Royal Crown', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'sword-1', title: 'Legendary Sword', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '35 min', colors: 9 }
    ]
  },
  {
    id: 'space',
    name: 'Space',
    icon: '🚀',
    description: 'Cosmic wonders and celestial bodies',
    boards: [
      { id: 'planet-1', title: 'Saturn and Rings', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'galaxy-1', title: 'Spiral Galaxy', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 18 },
      { id: 'astronaut-1', title: 'Space Astronaut', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 14 },
      { id: 'nebula-1', title: 'Colorful Nebula', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 20 },
      { id: 'moon-1', title: 'Full Moon', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 6 },
      { id: 'earth-1', title: 'Planet Earth', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'comet-1', title: 'Blazing Comet', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'stars-1', title: 'Starry Night Sky', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 16 },
      { id: 'mars-1', title: 'Red Planet Mars', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 9 },
      { id: 'sun-1', title: 'Solar Flares', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 15 },
      { id: 'blackhole-1', title: 'Black Hole', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 17 },
      { id: 'satellite-1', title: 'Space Satellite', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'meteor-1', title: 'Meteor Shower', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 13 },
      { id: 'jupiter-1', title: 'Giant Jupiter', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 14 },
      { id: 'station-1', title: 'Space Station', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 16 },
      { id: 'alien-1', title: 'UFO Sighting', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'constellation-1', title: 'Star Constellation', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '35 min', colors: 8 },
      { id: 'telescope-1', title: 'Space Telescope', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'eclipse-1', title: 'Solar Eclipse', imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 9 },
      { id: 'milkyway-1', title: 'Milky Way Galaxy', imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 22 }
    ]
  },
  {
    id: 'abstract',
    name: 'Abstract',
    icon: '🎨',
    description: 'Modern art and geometric patterns',
    boards: [
      { id: 'geometric-1', title: 'Geometric Shapes', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 10 },
      { id: 'mandala-1', title: 'Intricate Mandala', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'spiral-1', title: 'Color Spiral', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 12 },
      { id: 'waves-1', title: 'Abstract Waves', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 9 },
      { id: 'kaleidoscope-1', title: 'Kaleidoscope Pattern', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 16 },
      { id: 'fractal-1', title: 'Fractal Design', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 20 },
      { id: 'circles-1', title: 'Overlapping Circles', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'triangles-1', title: 'Triangle Mosaic', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 11 },
      { id: 'lines-1', title: 'Flowing Lines', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '25 min', colors: 6 },
      { id: 'gradient-1', title: 'Color Gradient', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '35 min', colors: 7 },
      { id: 'polygon-1', title: 'Polygon Art', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 13 },
      { id: 'optical-1', title: 'Optical Illusion', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 15 },
      { id: 'texture-1', title: 'Abstract Texture', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'splash-1', title: 'Paint Splash', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 8 },
      { id: 'mesh-1', title: 'Gradient Mesh', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '60 min', colors: 14 },
      { id: 'crystal-abstract-1', title: 'Crystal Formation', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 12 },
      { id: 'flow-1', title: 'Fluid Flow', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 11 },
      { id: 'prism-1', title: 'Light Prism', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '55 min', colors: 16 },
      { id: 'vortex-1', title: 'Color Vortex', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 13 },
      { id: 'matrix-1', title: 'Digital Matrix', imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 17 }
    ]
  },
  {
    id: 'portraits',
    name: 'Portraits',
    icon: '👤',
    description: 'Human faces and character studies',
    boards: [
      { id: 'woman-1', title: 'Elegant Woman', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 18 },
      { id: 'man-1', title: 'Distinguished Man', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 16 },
      { id: 'child-1', title: 'Smiling Child', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '60 min', colors: 12 },
      { id: 'elderly-1', title: 'Wise Elder', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '85 min', colors: 20 },
      { id: 'profile-1', title: 'Side Profile', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 14 },
      { id: 'eyes-1', title: 'Expressive Eyes', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 15 },
      { id: 'smile-1', title: 'Joyful Smile', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 11 },
      { id: 'serious-1', title: 'Serious Expression', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 13 },
      { id: 'vintage-1', title: 'Vintage Portrait', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 17 },
      { id: 'artistic-1', title: 'Artistic Study', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '80 min', colors: 19 },
      { id: 'couple-1', title: 'Happy Couple', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '90 min', colors: 22 },
      { id: 'family-1', title: 'Family Portrait', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '95 min', colors: 24 },
      { id: 'baby-1', title: 'Sleeping Baby', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '45 min', colors: 8 },
      { id: 'teen-1', title: 'Teenager Portrait', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '55 min', colors: 12 },
      { id: 'hands-1', title: 'Expressive Hands', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '40 min', colors: 10 },
      { id: 'silhouette-1', title: 'Portrait Silhouette', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Easy', estimatedTime: '30 min', colors: 6 },
      { id: 'emotion-1', title: 'Raw Emotion', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '70 min', colors: 16 },
      { id: 'character-1', title: 'Character Study', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '75 min', colors: 18 },
      { id: 'beauty-1', title: 'Natural Beauty', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Hard', estimatedTime: '65 min', colors: 14 },
      { id: 'expression-1', title: 'Facial Expression', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', difficulty: 'Medium', estimatedTime: '50 min', colors: 11 }
    ]
  }
];

export const getAllBoards = (): Board[] => {
  return boardCategories.flatMap(category => category.boards);
};

export const getBoardsByCategory = (categoryId: string): Board[] => {
  const category = boardCategories.find(cat => cat.id === categoryId);
  return category ? category.boards : [];
};

export const getBoardById = (boardId: string): Board | undefined => {
  return getAllBoards().find(board => board.id === boardId);
};