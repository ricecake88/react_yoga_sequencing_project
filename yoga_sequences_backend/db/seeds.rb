# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Pose.create!(:id => 0, :name => "Warrior I", :sanskrit => "Virabhadrasana I",
    :pose_category => "Heart Opening", :tags => ["Hip", "Back", "Legs", "Glutes"],
    :url => "Warrior I URL", :video => "Warrior I Video",
    :image => "Warrior I Image",
    :description => "Start in Downward Facing Dog. Set Your Right Foot at a 45 degree angle and
    bring your opposite foot to meet your hands. You can use your hands to help bring the opposite
    foot if you have difficulty. Repeat on the opposite side.")
Pose.create!(:id => 1, :name=> "Warrior II", :sanskrit => "Virabhadrasana II",
    :pose_category=> "Hamstrings", :tags => ["Hip Flexors", "Back", "Glutes"],
    :url => "Warrior II URL", :video => "Warrior II Video",
    :image => "warrior II Image",
    :description => "Standing upright, with legs wide apart and arms spread apart
        with feet facing forward. Turn the right foot 90 degrees so it is facing the same
        direction as your hands. Bend your right leg 90 degrees into a lunge forming a right angle.
        Turn your left foot slightly inward and make sure the left foot is aligned and grounded
        in a straight line with the front foot. Engage and straighten
        your left leg while looking past your right hand. Have your body continue facing forward,
        engaging your core as you make sure your back is fully aligned over your hip/tucked in.")

Category.create(:id => 0, :name => "Uncategorized")
#Sequence.create(:name => "Morning Routine", :category_id=>1, :poses => [{id: 1}, {id: 2}, {id: 3}])