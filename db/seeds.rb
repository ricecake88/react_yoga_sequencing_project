# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Pose.create!(:id => 0, :name => "Warrior I", :sanskrit => "Virabhadrasana I",
    :pose_category => "Heart Opening", :tags => ["Hip", "Back", "Legs", "Glutes"],
    :url => "https://www.yogabasics.com/asana/warrior-i/", :video => "https://www.youtube.com/watch?v=k4qaVoAbeHM",
    :image => "warrior1",
    :description => "Start in Downward Facing Dog. Set Your Right Foot at a 45 degree angle and
    bring your opposite foot to meet your hands. You can use your hands to help bring the opposite
    foot if you have difficulty. Repeat on the opposite side.")
Pose.create!(:id => 1, :name=> "Warrior II", :sanskrit => "Virabhadrasana II",
    :pose_category=> "Hamstrings", :tags => ["Hip Flexors", "Back", "Glutes"],
    :url => "https://www.yogabasics.com/asana/warrior-ii/", :video => "https://www.youtube.com/watch?v=4Ejz7IgODlU",
    :image => "warrior2",
    :description => "Standing upright, with legs wide apart and arms spread apart
        with feet facing forward. Turn the right foot 90 degrees so it is facing the same
        direction as your hands. Bend your right leg 90 degrees into a lunge forming a right angle.
        Turn your left foot slightly inward and make sure the left foot is aligned and grounded
        in a straight line with the front foot. Engage and straighten
        your left leg while looking past your right hand. Have your body continue facing forward,
        engaging your core as you make sure your back is fully aligned over your hip/tucked in.")
Pose.create!(:id => 2, :name=> "Warrior III", :sanskrit => "Virabhadrasana III",
    :pose_category=> "Hamstrings", :tags => ["Quads", "Outer Thighs", "Pelvis"],
    :url => "https://www.yogabasics.com/asana/warrior-iii/", :video => "https://www.youtube.com/watch?v=_0K-Kuw6DOs",
    :image => "warrior3",
    :description => "Start by standing with feet at hips width apart. 
        Take a step forward with your right leg forward and start to bend forward at your hip while 
        bringing the left leg to align in a straight line with the torso, keeping the left leg 
        strong and straight as possible with your feet flexed, as though it is pressing against a wall.
        Keep your torso at a 90 degree angle, parallel with the floor. Bring your arms over your head,
        so that it is aligned in a straight line with body and lifted leg. If this is too difficult, arms
        can be airplane arms, where they are straight but next to the torso. ")
