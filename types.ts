import React from 'react';

export type LessonCategory = 
  | 'intro'       // はじめに・基本図形
  | 'logic'       // 変数・条件分岐・ループ
  | 'math'        // 数学・動き・座標
  | 'structure'   // 関数・配列・クラス
  | 'advanced';   // 画像・PVector・3D

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export type ViewState = 'home' | string; // 'home' or lesson ID

export interface Shortcut {
  key: string;
  description: string;
}