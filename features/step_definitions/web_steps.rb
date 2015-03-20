Given(/^there are following food items$/) do |table|
  table.hashes.each do |row|
    FoodItem.create!(row)
  end
end

When(/^I visit "(.*?)" page$/) do |page_name|
  visit eval("#{page_name}_path")
end

Then(/^I should see following items$/) do |table|
  table.hashes.each do |row|
    expect(page).to have_content(row[:name])
  end
end
