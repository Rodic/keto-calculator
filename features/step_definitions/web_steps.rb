Given(/^there are following food items$/) do |table|
  table.hashes.each do |row|
    FoodItem.create!(row)
  end
end

When(/^I visit "(.*?)" page$/) do |page_name|
  visit eval("#{page_name}_path")
end

Given(/^I am on "(.*?)" page$/) do |page_name|
  step "I visit \"#{page_name}\" page"
end

Then(/^I should be on "(.*?)" page$/) do |page_name|
  expect(page.current_path).to eq(eval("#{page_name}_path"))
end

Then(/^I should be on "(.*?)" food item page$/) do |name|
  food = FoodItem.find_by_name(name)
  expect(page.current_path).to eq(food_item_path(food))
end

Then(/^I should see$/) do |table|
  table.hashes.each do |row|
    row.each do |k,v|
      expect(page).to have_content(v)
    end
  end
end

Then(/^I should see following items$/) do |table|
  table.hashes.each do |row|
    expect(page).to have_content(row[:name])
  end
end

Given(/^I fill fields with values$/) do |table|
  table.hashes.each do |row|
    row.each do |field, value|
      fill_in field, with: value
    end
  end
end

Given(/^I press "(.*?)"$/) do |btn|
  click_button btn
end

Then(/^I should see "(.*?)"$/) do |cnt|
  expect(page).to have_content(cnt)
end
