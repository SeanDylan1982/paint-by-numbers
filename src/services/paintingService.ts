import { supabase } from '../lib/supabase';
import { PaintByNumbersData } from '../types/paintByNumbers';

export interface UserPainting {
  id: string;
  user_id: string;
  title: string;
  original_image_url: string;
  processed_image_url: string | null;
  painting_data: PaintByNumbersData;
  completion_percentage: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export class PaintingService {
  static async savePainting(
    title: string,
    originalImageUrl: string,
    processedImageUrl: string | null,
    paintingData: PaintByNumbersData
  ): Promise<{ data: UserPainting | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const completedRegions = paintingData.regions.filter(r => r.isPainted).length;
    const completionPercentage = Math.round((completedRegions / paintingData.regions.length) * 100);

    const { data, error } = await supabase
      .from('user_paintings')
      .insert({
        user_id: user.id,
        title,
        original_image_url: originalImageUrl,
        processed_image_url: processedImageUrl,
        painting_data: paintingData,
        completion_percentage: completionPercentage,
        is_completed: completionPercentage === 100,
      })
      .select()
      .single();

    return { data, error };
  }

  static async updatePainting(
    paintingId: string,
    paintingData: PaintByNumbersData,
    title?: string
  ): Promise<{ data: UserPainting | null; error: any }> {
    const completedRegions = paintingData.regions.filter(r => r.isPainted).length;
    const completionPercentage = Math.round((completedRegions / paintingData.regions.length) * 100);

    const updateData: any = {
      painting_data: paintingData,
      completion_percentage: completionPercentage,
      is_completed: completionPercentage === 100,
      updated_at: new Date().toISOString(),
    };

    if (title) {
      updateData.title = title;
    }

    const { data, error } = await supabase
      .from('user_paintings')
      .update(updateData)
      .eq('id', paintingId)
      .select()
      .single();

    return { data, error };
  }

  static async getUserPaintings(): Promise<{ data: UserPainting[] | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('user_paintings')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    return { data, error };
  }

  static async deletePainting(paintingId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('user_paintings')
      .delete()
      .eq('id', paintingId);

    return { error };
  }

  static async getPainting(paintingId: string): Promise<{ data: UserPainting | null; error: any }> {
    const { data, error } = await supabase
      .from('user_paintings')
      .select('*')
      .eq('id', paintingId)
      .single();

    return { data, error };
  }
}