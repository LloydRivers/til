package org.example;

import java.util.Map;

public class TwelveDays {
    private final int maxDays;

    private final Map<Integer, String> daysToPresents = Map.ofEntries(
            Map.entry(1, "A partridge in a pear tree."),
            Map.entry(2, "Two turtle doves and"),
            Map.entry(3, "Three french hens"),
            Map.entry(4, "Four calling birds"),
            Map.entry(5, "Five golden rings"),
            Map.entry(6, "Six geese a-laying"),
            Map.entry(7, "Seven swans a-swimming"),
            Map.entry(8, "Eight maids a-milking"),
            Map.entry(9, "Nine ladies dancing"),
            Map.entry(10, "Ten lords a-leaping"),
            Map.entry(11, "Eleven pipers piping"),
            Map.entry(12, "Twelve drummers drumming"));

    private String numberToOrdinal(int num) {
        return switch (num) {
            case 1 -> "first";
            case 2 -> "second";
            case 3 -> "third";
            case 4 -> "fourth";
            case 5 -> "fifth";
            case 6 -> "sixth";
            case 7 -> "seventh";
            case 8 -> "eighth";
            case 9 -> "ninth";
            case 10 -> "tenth";
            case 11 -> "eleventh";
            case 12 -> "twelfth";
            default -> "unknown";
        };
    }

    public TwelveDays(int day) {
        this.maxDays = day;
    }

    StringBuilder print() {
        if (this.maxDays < 1 | this.maxDays > 12) {
            System.out.println("Invalid maxDays value. Please select between 1 and 12");
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i <= this.maxDays; i++) {
            sb.append("On the ").append(numberToOrdinal(i)).append(" day of Christmas\n");
            sb.append("My true love sent to me;\n");

            for (int j = i; j > 0; j--) {
                sb.append(daysToPresents.get(j)).append("\n");
            }
            sb.append("\n");
        }

        return sb;
    }
}
